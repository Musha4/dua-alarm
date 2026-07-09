"use client";

// ============================================================
// Alarm Ringing → Listening → Success
// ============================================================
// One route with three states so the alarm sound keeps looping
// continuously across the whole flow. The sound stops ONLY when:
//   - recitation progress reaches 80% (auto-complete), or
//   - the user taps the secondary "I completed it" fallback, or
//   - the user snoozes.
// Tapping the microphone does NOT stop the alarm — it starts listening.

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getDua, type Dua } from "@/lib/app/duas";
import {
  addCompletion,
  getAlarms,
  getCompletions,
  getStreaks,
  updateAlarm,
  type Alarm,
} from "@/lib/app/store";
import { startAlarmSound, stopAlarmSound } from "@/lib/app/sound";
import {
  COMPLETION_THRESHOLD,
  computeProgress,
  isSpeechSupported,
  startRecognition,
  type SpeechSession,
} from "@/lib/app/speech";
import { GreenButton } from "@/components/app/ui";

type Stage = "ringing" | "listening" | "success";

function formatTime(time: string): { hour: number; minutes: string; period: string } {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return { hour, minutes: String(m).padStart(2, "0"), period };
}

export default function RingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [alarm, setAlarm] = useState<Alarm | null>(null);
  const [dua, setDua] = useState<Dua | null>(null);
  const [stage, setStage] = useState<Stage>("ringing");
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [progress, setProgress] = useState(0);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const sessionRef = useRef<SpeechSession | null>(null);
  const doneRef = useRef(false);

  /* ---- mount: resolve alarm + start the looping sound ---- */
  useEffect(() => {
    setMounted(true);
    const id = new URLSearchParams(window.location.search).get("id");
    const found = getAlarms().find((a) => a.id === id) ?? null;
    const resolved: Alarm =
      found ??
      // Demo/preview fallback so the flow can always be tried
      ({
        id: "demo",
        time: "06:30",
        period: "morning",
        repeat: "daily",
        duaSlug: "morning",
        sound: "chime",
        reciteToDismiss: true,
        enabled: true,
      } as Alarm);
    setAlarm(resolved);
    setDua(getDua(resolved.duaSlug));

    if (resolved.sound !== "silent") {
      void startAlarmSound().then((r) => setSoundBlocked(r === "blocked"));
    }
    return () => {
      stopAlarmSound();
      sessionRef.current?.stop();
    };
  }, []);

  /* ---- completion (recited or manual fallback) ---- */
  const complete = useCallback(
    (method: "recited" | "manual") => {
      if (doneRef.current || !alarm) return;
      doneRef.current = true;
      stopAlarmSound(); // ← the ONLY success path that stops the alarm
      sessionRef.current?.stop();
      addCompletion({
        alarmId: alarm.id === "demo" ? undefined : alarm.id,
        duaSlug: alarm.duaSlug,
        method,
      });
      setStreak(getStreaks(getCompletions()).current);
      setStage("success");
    },
    [alarm],
  );

  /* ---- start listening (alarm keeps ringing!) ---- */
  function startListening() {
    if (!dua) return;
    setStage("listening");
    if (!isSpeechSupported()) {
      setSpeechError(
        "Speech recognition isn't supported in this browser. Use the button below once you've recited.",
      );
      return;
    }
    const session = startRecognition(
      (text) => {
        setTranscript(text);
        const p = computeProgress(text, getDua(alarmDuaSlugRef.current));
        setProgress((prev) => Math.max(prev, p));
        if (p >= COMPLETION_THRESHOLD) complete("recited");
      },
      (message) => setSpeechError(message),
    );
    if (!session) {
      setSpeechError("Could not access the microphone. Use the button below.");
      return;
    }
    sessionRef.current = session;
  }

  // keep the dua slug reachable inside the recognition callback
  const alarmDuaSlugRef = useRef("morning");
  useEffect(() => {
    if (alarm) alarmDuaSlugRef.current = alarm.duaSlug;
  }, [alarm]);

  function snooze() {
    if (!alarm) return;
    stopAlarmSound();
    sessionRef.current?.stop();
    if (alarm.id !== "demo") {
      updateAlarm({ ...alarm, snoozedUntil: Date.now() + 5 * 60 * 1000 });
    }
    router.push("/app");
  }

  if (!mounted || !alarm || !dua) {
    return <div className="min-h-dvh bg-[#0A1712]" />;
  }

  const t = formatTime(alarm.time);
  const pct = Math.round(progress * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#123A2C] via-[#0A1712] to-[#06100C] text-[#F7F1E3]">
      <div className="pattern-star pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#E6CE8C]/10 blur-3xl" aria-hidden="true" />

      {/* Sound blocked by autoplay policy → one tap enables it */}
      {soundBlocked && stage !== "success" && (
        <button
          type="button"
          onClick={() => void startAlarmSound().then((r) => setSoundBlocked(r === "blocked"))}
          className="absolute inset-x-0 top-0 z-50 bg-[#C9A227] py-3 text-center text-[13px] font-bold text-[#0A1712]"
        >
          🔇 Tap to enable the alarm sound
        </button>
      )}

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center px-6 pb-10 pt-14 text-center">
        {/* ============ SUCCESS ============ */}
        {stage === "success" ? (
          <>
            <div className="mt-16 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] shadow-[0_20px_50px_-10px_rgba(201,162,39,0.6)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A1712" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14">
                <path d="m5 13 4.5 4.5L19 7" />
              </svg>
            </div>
            <h1 className="mt-8 font-display text-[30px] font-semibold tracking-tight">
              Dua completed
            </h1>
            <p className="mt-2 text-[15px] text-white/55">
              MashaAllah — your {alarm.period === "morning" ? "morning" : "night"} began
              with remembrance.
            </p>
            <div className="mt-8 flex w-full items-center gap-4 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/[0.08]">
              <span className="text-4xl">🔥</span>
              <div className="flex-1 text-left">
                <p className="text-[22px] font-bold leading-none">
                  {streak} day streak
                </p>
                <p className="mt-1.5 text-[13px] text-white/50">Keep it going tomorrow</p>
              </div>
            </div>
            <GreenButton onClick={() => router.push("/app")} className="mt-auto w-full">
              Continue
            </GreenButton>
          </>
        ) : (
          <>
            {/* ============ RINGING / LISTENING header ============ */}
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E6CE8C]/85">
              <span className="h-1.5 w-1.5 animate-[shimmer-dot_1s_ease-in-out_infinite] rounded-full bg-[#E6CE8C]" />
              {alarm.period === "morning" ? "Fajr Alarm" : "Bedtime Alarm"} · Ringing
            </p>
            <p className="mt-1 text-[64px] font-semibold leading-none tracking-tight">
              {t.hour}:{t.minutes}
              <span className="ml-1 text-[26px] font-medium text-white/50">{t.period}</span>
            </p>
            <p className="mt-3 rounded-full bg-white/[0.07] px-4 py-1.5 text-[13px] font-semibold text-[#E6CE8C] ring-1 ring-white/10">
              {dua.icon} {dua.title}
            </p>

            {/* Dua card */}
            <div className="mt-5 w-full rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/[0.08] backdrop-blur-xl">
              <p className="font-arabic text-[24px] leading-[2] [text-wrap:balance]" lang="ar" dir="rtl">
                {dua.arabic}
              </p>
              <p className="mt-2 text-[13px] italic text-[#E6CE8C]/80">
                {dua.transliteration}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                “{dua.translation}”
              </p>
            </div>

            {stage === "ringing" ? (
              /* ============ RINGING ============ */
              <div className="mt-auto flex w-full flex-col items-center pt-6">
                <button
                  type="button"
                  onClick={startListening}
                  aria-label="Start reciting"
                  className="relative flex h-[88px] w-[88px] items-center justify-center"
                >
                  <span className="absolute inset-0 rounded-full bg-[#E6CE8C]/25 animate-[ring-pulse_2s_ease-out_infinite]" />
                  <span className="absolute inset-0 rounded-full bg-[#E6CE8C]/25 animate-[ring-pulse_2s_ease-out_infinite]" style={{ animationDelay: "0.7s" }} />
                  <span className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] shadow-[0_16px_40px_-8px_rgba(201,162,39,0.7)]">
                    <MicIcon className="h-9 w-9" stroke="#0A1712" />
                  </span>
                </button>
                <p className="mt-4 text-[17px] font-semibold">Recite to Stop Alarm</p>
                <p className="mt-1 text-[12px] text-white/40">
                  The alarm keeps ringing until your dua is complete
                </p>
                <button
                  type="button"
                  onClick={snooze}
                  className="mt-6 text-[14px] font-medium text-white/40"
                >
                  Snooze · 5 min
                </button>
              </div>
            ) : (
              /* ============ LISTENING ============ */
              <div className="mt-auto flex w-full flex-col items-center pt-5">
                {/* Progress ring around live mic */}
                <div className="relative h-[120px] w-[120px]">
                  <svg width="120" height="120" className="-rotate-90">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                    <circle
                      cx="60" cy="60" r="54" fill="none" stroke="#E6CE8C" strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={2 * Math.PI * 54 * (1 - progress)}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-[10px] flex items-center justify-center rounded-full bg-gradient-to-b from-[#178360] to-[#0E5A43]">
                    <MicIcon className="h-9 w-9" stroke="#F7F1E3" />
                  </div>
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-[17px] font-semibold">
                  Listening
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-[#E6CE8C] animate-[shimmer-dot_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </p>
                <p className="mt-1 text-[13px] text-white/45">
                  {pct}% — {pct >= 50 ? "almost there, keep going" : "recite the dua aloud"}
                </p>

                {/* Live transcript */}
                <div className="mt-4 min-h-12 w-full rounded-2xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/[0.07]">
                  {speechError ? (
                    <p className="text-[13px] leading-relaxed text-[#E6CE8C]/90">{speechError}</p>
                  ) : (
                    <p className="text-[13px] leading-relaxed text-white/60" dir="auto">
                      {transcript || "Waiting for your voice…"}
                    </p>
                  )}
                </div>

                {/* Secondary fallback — deliberately quiet */}
                <button
                  type="button"
                  onClick={() => complete("manual")}
                  className="mt-5 text-[13px] font-medium text-white/35 underline underline-offset-4"
                >
                  Can&apos;t speak right now? Tap to complete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function MicIcon({ className, stroke }: { className: string; stroke: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21m-3.5 0h7" />
    </svg>
  );
}
