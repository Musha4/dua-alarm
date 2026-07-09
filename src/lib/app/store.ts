// ============================================================
// Data layer for the Dua Alarm app (MVP)
// ============================================================
// localStorage is the source of truth so the app works instantly and
// offline. When Supabase is configured (see src/lib/supabase.ts), every
// write is also mirrored to the `alarms` / `completions` tables keyed by
// an anonymous device id — a stand-in for real auth. To upgrade later:
// swap getDeviceId() for supabase.auth.getUser() and read from Supabase
// instead of localStorage.

import { supabase } from "@/lib/supabase";

export type Alarm = {
  id: string;
  time: string; // "06:30" (24h)
  period: "morning" | "bedtime";
  repeat: "daily" | "once";
  duaSlug: string;
  sound: "chime" | "silent";
  reciteToDismiss: boolean;
  enabled: boolean;
  /** epoch ms — set when the user snoozes; scheduler re-fires at this time */
  snoozedUntil?: number;
  /** YYYY-MM-DD of the last day this alarm fired (prevents double-firing) */
  lastFiredDate?: string;
};

export type Completion = {
  id: string;
  alarmId?: string;
  duaSlug: string;
  completedAt: string; // ISO
  method: "recited" | "manual";
};

const KEYS = {
  deviceId: "dua-alarm.device-id",
  name: "dua-alarm.user-name",
  alarms: "dua-alarm.alarms",
  completions: "dua-alarm.completions",
  draftDua: "dua-alarm.draft-dua",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- identity (anonymous local "auth") ---------- */

export function getDeviceId(): string {
  let id = localStorage.getItem(KEYS.deviceId);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEYS.deviceId, id);
    // Mirror the anonymous user to Supabase (fire-and-forget).
    void supabase?.from("app_users").insert({ device_id: id }).then(() => {});
  }
  return id;
}

export function getUserName(): string {
  return localStorage.getItem(KEYS.name) ?? "Yusuf";
}

export function setUserName(name: string) {
  localStorage.setItem(KEYS.name, name);
}

/* ---------- alarms ---------- */

export function getAlarms(): Alarm[] {
  return read<Alarm[]>(KEYS.alarms, []);
}

export function saveAlarm(alarm: Alarm) {
  const alarms = getAlarms().filter((a) => a.id !== alarm.id);
  alarms.push(alarm);
  alarms.sort((a, b) => a.time.localeCompare(b.time));
  write(KEYS.alarms, alarms);

  // Mirror to Supabase (insert-only for MVP; see supabase/app-schema.sql)
  void supabase
    ?.from("alarms")
    .insert({
      id: alarm.id,
      device_id: getDeviceId(),
      time: alarm.time,
      period: alarm.period,
      repeat: alarm.repeat,
      dua_slug: alarm.duaSlug,
      sound: alarm.sound,
      recite_to_dismiss: alarm.reciteToDismiss,
      enabled: alarm.enabled,
    })
    .then(() => {});
}

export function updateAlarm(alarm: Alarm) {
  // Local-only update (Supabase rows are an insert-only event log in MVP).
  const alarms = getAlarms().filter((a) => a.id !== alarm.id);
  alarms.push(alarm);
  alarms.sort((a, b) => a.time.localeCompare(b.time));
  write(KEYS.alarms, alarms);
}

export function deleteAlarm(id: string) {
  write(KEYS.alarms, getAlarms().filter((a) => a.id !== id));
}

/** Next occurrence of an alarm as a Date (today or tomorrow). */
export function nextOccurrence(alarm: Alarm): Date {
  const [h, m] = alarm.time.split(":").map(Number);
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);
  return next;
}

export function nextAlarm(alarms: Alarm[]): Alarm | null {
  const enabled = alarms.filter((a) => a.enabled);
  if (enabled.length === 0) return null;
  return enabled.reduce((best, a) =>
    nextOccurrence(a) < nextOccurrence(best) ? a : best,
  );
}

/* ---------- completions & streaks ---------- */

export function getCompletions(): Completion[] {
  return read<Completion[]>(KEYS.completions, []);
}

export function addCompletion(c: Omit<Completion, "id" | "completedAt">): Completion {
  const completion: Completion = {
    ...c,
    id: crypto.randomUUID(),
    completedAt: new Date().toISOString(),
  };
  const all = getCompletions();
  all.push(completion);
  write(KEYS.completions, all);

  void supabase
    ?.from("completions")
    .insert({
      id: completion.id,
      device_id: getDeviceId(),
      alarm_id: completion.alarmId ?? null,
      dua_slug: completion.duaSlug,
      method: completion.method,
      completed_at: completion.completedAt,
    })
    .then(() => {});

  return completion;
}

function toDay(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function todayKey(): string {
  return toDay(new Date().toISOString());
}

/** Current streak = consecutive days with ≥1 completion, ending today or yesterday. */
export function getStreaks(completions: Completion[]): {
  current: number;
  longest: number;
} {
  const days = [...new Set(completions.map((c) => toDay(c.completedAt)))].sort();
  if (days.length === 0) return { current: 0, longest: 0 };

  const daySet = new Set(days);
  let longest = 0;
  for (const day of days) {
    const prev = shiftDay(day, -1);
    if (!daySet.has(prev)) {
      // start of a run — walk forward
      let len = 1;
      let cursor = day;
      while (daySet.has(shiftDay(cursor, 1))) {
        cursor = shiftDay(cursor, 1);
        len++;
      }
      longest = Math.max(longest, len);
    }
  }

  // Current streak counts back from today (or yesterday, so a streak
  // isn't "broken" before the user has had a chance to complete today).
  let current = 0;
  let cursor = todayKey();
  if (!daySet.has(cursor)) cursor = shiftDay(cursor, -1);
  while (daySet.has(cursor)) {
    current++;
    cursor = shiftDay(cursor, -1);
  }
  return { current, longest: Math.max(longest, current) };
}

function shiftDay(day: string, delta: number): string {
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(y, m - 1, d + delta);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/* ---------- draft (Create Alarm ↔ Choose Dua handoff) ---------- */

export function getDraftDua(): string | null {
  return localStorage.getItem(KEYS.draftDua);
}

export function setDraftDua(slug: string) {
  localStorage.setItem(KEYS.draftDua, slug);
}

export function clearDraftDua() {
  localStorage.removeItem(KEYS.draftDua);
}
