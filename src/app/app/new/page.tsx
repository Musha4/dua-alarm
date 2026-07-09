"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDua } from "@/lib/app/duas";
import { clearDraftDua, getDraftDua, saveAlarm } from "@/lib/app/store";
import { AppScreen, BackHeader, Card, GoldButton, Toggle } from "@/components/app/ui";

export default function NewAlarmPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("06:30");
  const [period, setPeriod] = useState<"morning" | "bedtime">("morning");
  const [repeat, setRepeat] = useState<"daily" | "once">("daily");
  const [duaSlug, setDuaSlug] = useState("morning");
  const [sound, setSound] = useState<"chime" | "silent">("chime");
  const [recite, setRecite] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Returning from the Choose Dua picker restores the selection.
    const draft = getDraftDua();
    if (draft) setDuaSlug(draft);
  }, []);

  function selectPeriod(p: "morning" | "bedtime") {
    setPeriod(p);
    // Sensible defaults when switching mode
    if (p === "bedtime") {
      setDuaSlug((s) => (s === "morning" ? "bedtime" : s));
      setTime((t) => (t === "06:30" ? "22:30" : t));
    } else {
      setDuaSlug((s) => (s === "bedtime" ? "morning" : s));
      setTime((t) => (t === "22:30" ? "06:30" : t));
    }
  }

  function save() {
    saveAlarm({
      id: crypto.randomUUID(),
      time,
      period,
      repeat,
      duaSlug,
      sound,
      reciteToDismiss: recite,
      enabled: true,
    });
    clearDraftDua();
    router.push("/app");
  }

  if (!mounted) return <AppScreen>{null}</AppScreen>;
  const dua = getDua(duaSlug);

  return (
    <AppScreen>
      <BackHeader title="New Alarm" />

      {/* Time picker */}
      <Card className="flex flex-col items-center px-5 py-7">
        <input
          type="time"
          value={time}
          onChange={(e) => e.target.value && setTime(e.target.value)}
          className="w-full bg-transparent text-center font-display text-[52px] font-semibold tracking-tight text-[#F7F1E3] outline-none [color-scheme:dark]"
          aria-label="Alarm time"
        />
        <p className="mt-1 text-[12px] text-white/35">Tap the time to change it</p>
      </Card>

      {/* Morning / Bedtime */}
      <div className="mt-4 flex rounded-2xl bg-white/[0.06] p-1 ring-1 ring-white/[0.08]">
        {(
          [
            ["morning", "🌅 Morning"],
            ["bedtime", "🌙 Bedtime"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => selectPeriod(value)}
            className={`flex-1 rounded-xl py-2.5 text-[15px] font-semibold transition-colors ${
              period === value
                ? "bg-gradient-to-b from-[#178360] to-[#0E5A43] shadow"
                : "text-white/45"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Settings */}
      <Card className="mt-4 divide-y divide-white/[0.06]">
        <button
          type="button"
          onClick={() => setRepeat(repeat === "daily" ? "once" : "daily")}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <span className="text-[16px]">Repeat</span>
          <span className="text-[15px] text-[#E6CE8C]">
            {repeat === "daily" ? "Every day" : "Once"}
          </span>
        </button>

        <Link href="/app/duas?pick=1" className="flex items-center justify-between px-5 py-4">
          <span className="text-[16px]">Dua</span>
          <span className="flex items-center gap-2 text-[15px] text-[#E6CE8C]">
            {dua.icon} {dua.title}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white/30">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSound(sound === "chime" ? "silent" : "chime")}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <span className="text-[16px]">Sound</span>
          <span className="text-[15px] text-[#E6CE8C]">
            {sound === "chime" ? "Gentle Chime" : "Silent"}
          </span>
        </button>

        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-[16px]">Recite to dismiss</p>
            <p className="mt-0.5 text-[12px] text-white/40">
              Alarm turns off only after your dua
            </p>
          </div>
          <Toggle on={recite} onChange={setRecite} label="Recite to dismiss" />
        </div>
      </Card>

      <GoldButton onClick={save} className="mt-6 w-full">
        Save Alarm
      </GoldButton>

      <p className="mt-3 text-center text-[12px] text-white/30">
        Your {dua.title.toLowerCase()} will appear when the alarm rings
      </p>
    </AppScreen>
  );
}
