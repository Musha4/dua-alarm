"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DUAS } from "@/lib/app/duas";
import { setDraftDua } from "@/lib/app/store";
import { AppScreen, BackHeader, BottomNav, Card } from "@/components/app/ui";

export default function DuasPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  // Picker mode: opened from Create Alarm via /app/duas?pick=1 —
  // tapping a dua stores the choice and returns to the form.
  const [pickMode, setPickMode] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setPickMode(new URLSearchParams(window.location.search).has("pick"));
  }, []);

  function choose(slug: string) {
    setSelected(slug);
    if (pickMode) {
      setDraftDua(slug);
      router.push("/app/new");
    }
  }

  if (!mounted) return <AppScreen>{null}</AppScreen>;

  return (
    <AppScreen withNav={!pickMode}>
      <BackHeader
        title={pickMode ? "Choose Dua" : "Dua Library"}
        backHref={pickMode ? "/app/new" : "/app"}
      />

      <div className="flex flex-col gap-4">
        {DUAS.map((dua) => {
          const isSelected = selected === dua.slug;
          return (
            <button
              key={dua.slug}
              type="button"
              onClick={() => choose(dua.slug)}
              className={`rounded-3xl p-5 text-left ring-1 backdrop-blur-xl transition-colors ${
                isSelected
                  ? "bg-[#0E5A43]/45 ring-[#E6CE8C]/40"
                  : "bg-white/[0.06] ring-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.07] text-xl">
                  {dua.icon}
                </span>
                <div className="flex-1">
                  <p className="text-[16px] font-semibold">{dua.title}</p>
                  <p className="text-[12px] text-white/40">
                    {dua.source} · ~{dua.durationSeconds}s
                  </p>
                </div>
                {isSelected && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6CE8C]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#0A1712" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="m5 13 4 4 10-10" />
                    </svg>
                  </span>
                )}
              </div>

              <p className="mt-4 font-arabic text-[22px] leading-[2] text-[#F7F1E3]" lang="ar" dir="rtl">
                {dua.arabic}
              </p>
              <p className="mt-2 text-[13px] italic text-[#E6CE8C]/80">
                {dua.transliteration}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                “{dua.translation}”
              </p>
            </button>
          );
        })}
      </div>

      {pickMode && (
        <p className="mt-4 text-center text-[12px] text-white/35">
          Tap a dua to use it for this alarm
        </p>
      )}

      {!pickMode && <BottomNav active="Duas" />}
    </AppScreen>
  );
}
