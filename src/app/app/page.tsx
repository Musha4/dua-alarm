"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDua } from "@/lib/app/duas";
import {
  getAlarms,
  getCompletions,
  getStreaks,
  getUserName,
  nextAlarm,
  nextOccurrence,
  updateAlarm,
  todayKey,
  type Alarm,
} from "@/lib/app/store";
import { AppScreen, BottomNav, Card, Toggle } from "@/components/app/ui";

function hijriDate(): string {
  try {
    return new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "Hijri date"; // placeholder if the calendar isn't supported
  }
}

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });
  const [doneToday, setDoneToday] = useState(0);
  const [notifState, setNotifState] = useState<string>("unavailable");

  useEffect(() => {
    setMounted(true);
    setAlarms(getAlarms());
    const completions = getCompletions();
    setStreak(getStreaks(completions));
    setDoneToday(
      completions.filter((c) => c.completedAt.slice(0, 10) === todayKey()).length,
    );
    if (typeof Notification !== "undefined") {
      setNotifState(Notification.permission);
    }
  }, []);

  function toggleAlarm(alarm: Alarm, enabled: boolean) {
    const updated = { ...alarm, enabled, snoozedUntil: undefined };
    updateAlarm(updated);
    setAlarms(getAlarms());
  }

  async function enableNotifications() {
    const result = await Notification.requestPermission();
    setNotifState(result);
  }

  const next = nextAlarm(alarms);
  const nextDua = next ? getDua(next.duaSlug) : null;

  if (!mounted) return <AppScreen withNav>{null}</AppScreen>;

  return (
    <AppScreen withNav>
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-[#E6CE8C]/80">{hijriDate()}</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-tight">
            {greeting()}, {getUserName()}
          </h1>
        </div>
        <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#178360] to-[#0E5A43] text-[15px] font-bold ring-2 ring-[#E6CE8C]/30">
          {getUserName().charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Streak card */}
      <Card className="mt-6 p-5">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🔥</span>
          <div className="flex-1">
            <p className="text-[22px] font-bold leading-none">
              {streak.current} day streak
            </p>
            <p className="mt-1.5 text-[13px] text-white/50">
              {doneToday > 0
                ? `${doneToday} dua${doneToday > 1 ? "s" : ""} completed today`
                : "No dua completed yet today"}
            </p>
          </div>
          <div className="rounded-full bg-[#E6CE8C]/15 px-3 py-1.5 text-[12px] font-semibold text-[#E6CE8C]">
            Best: {streak.longest}
          </div>
        </div>
      </Card>

      {/* Next alarm */}
      {next && nextDua ? (
        <Card className="mt-4 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0E5A43]/60 text-xl">
              {nextDua.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium uppercase tracking-wider text-white/40">
                Next alarm ·{" "}
                {nextOccurrence(next).getDate() === new Date().getDate()
                  ? "today"
                  : "tomorrow"}
              </p>
              <p className="mt-0.5 truncate text-[17px] font-semibold">
                {formatTime(next.time)} · {nextDua.title}
              </p>
            </div>
            <Toggle on={next.enabled} onChange={(v) => toggleAlarm(next, v)} label="Alarm enabled" />
          </div>
          <Link
            href={`/app/ring?id=${next.id}`}
            className="mt-4 block rounded-xl bg-white/[0.06] py-2.5 text-center text-[13px] font-semibold text-[#E6CE8C] ring-1 ring-white/[0.08]"
          >
            ▶ Preview this alarm
          </Link>
        </Card>
      ) : (
        <Card className="mt-4 p-6 text-center">
          <p className="text-[15px] font-semibold">No alarms yet</p>
          <p className="mt-1 text-[13px] text-white/50">
            Create your first dua alarm to start your streak.
          </p>
          <Link
            href="/app/new"
            className="mt-4 inline-block rounded-2xl bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] px-8 py-3 text-[14px] font-bold text-[#0A1712]"
          >
            ＋ New Alarm
          </Link>
        </Card>
      )}

      {/* Other alarms */}
      {alarms.filter((a) => a.id !== next?.id).length > 0 && (
        <Card className="mt-4 divide-y divide-white/[0.06]">
          {alarms
            .filter((a) => a.id !== next?.id)
            .map((alarm) => (
              <div key={alarm.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className={`text-[16px] font-semibold ${alarm.enabled ? "" : "text-white/40"}`}>
                    {formatTime(alarm.time)}
                  </p>
                  <p className="text-[12px] text-white/40">
                    {getDua(alarm.duaSlug).title} · {alarm.repeat === "daily" ? "Every day" : "Once"}
                  </p>
                </div>
                <Toggle on={alarm.enabled} onChange={(v) => toggleAlarm(alarm, v)} label="Alarm enabled" />
              </div>
            ))}
        </Card>
      )}

      {/* Quick actions */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          ["/app/new", "＋", "New Alarm"],
          ["/app/duas", "📖", "Duas"],
          ["/app/streaks", "🔥", "Streaks"],
        ].map(([href, icon, name]) => (
          <Link key={name} href={href} className="flex flex-col items-center gap-2">
            <span className="flex h-[54px] w-full items-center justify-center rounded-2xl bg-white/[0.06] text-xl ring-1 ring-white/[0.08]">
              <span className={name === "New Alarm" ? "text-2xl font-light text-[#E6CE8C]" : ""}>{icon}</span>
            </span>
            <span className="text-[11px] font-medium text-white/50">{name}</span>
          </Link>
        ))}
      </div>

      {/* Notifications + MVP limitation */}
      {notifState === "default" && (
        <button
          type="button"
          onClick={enableNotifications}
          className="mt-5 rounded-2xl bg-[#0E5A43]/40 px-5 py-3.5 text-[13px] font-semibold text-[#E6CE8C] ring-1 ring-[#178360]/40"
        >
          🔔 Enable notifications so you notice the alarm
        </button>
      )}
      <p className="mt-5 rounded-2xl bg-white/[0.04] px-4 py-3 text-center text-[12px] leading-relaxed text-white/35 ring-1 ring-white/[0.05]">
        MVP note: browser alarms only ring while this tab is open. Keep the
        app open — a mobile app with real background alarms is coming.
      </p>

      <BottomNav active="Home" />
    </AppScreen>
  );
}
