"use client";

import { useEffect, useState } from "react";
import { getDua } from "@/lib/app/duas";
import { getCompletions, getStreaks, type Completion } from "@/lib/app/store";
import { AppScreen, BackHeader, BottomNav, Card } from "@/components/app/ui";

export default function StreaksPage() {
  const [mounted, setMounted] = useState(false);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [streak, setStreak] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    setMounted(true);
    const all = getCompletions();
    setCompletions([...all].reverse().slice(0, 14));
    setStreak(getStreaks(all));
  }, []);

  if (!mounted) return <AppScreen withNav>{null}</AppScreen>;

  const thisWeek = completions.filter(
    (c) => Date.now() - new Date(c.completedAt).getTime() < 7 * 86400_000,
  ).length;

  return (
    <AppScreen withNav>
      <BackHeader title="Your Streak" />

      <div className="grid grid-cols-3 gap-3">
        {[
          ["🔥", String(streak.current), "Current"],
          ["🏆", String(streak.longest), "Longest"],
          ["📅", String(thisWeek), "This week"],
        ].map(([icon, value, name]) => (
          <Card key={name} className="flex flex-col items-center p-4">
            <span className="text-xl">{icon}</span>
            <p className="mt-1.5 text-[22px] font-bold leading-none">{value}</p>
            <p className="mt-1 text-[11px] font-medium text-white/40">{name}</p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-[13px] font-semibold uppercase tracking-wider text-white/40">
        Recent completions
      </p>

      {completions.length === 0 ? (
        <Card className="mt-3 p-6 text-center">
          <p className="text-[15px] font-semibold">Nothing here yet</p>
          <p className="mt-1 text-[13px] text-white/50">
            Complete your first dua alarm and it will show up here.
          </p>
        </Card>
      ) : (
        <Card className="mt-3 divide-y divide-white/[0.06]">
          {completions.map((c) => {
            const dua = getDua(c.duaSlug);
            const at = new Date(c.completedAt);
            return (
              <div key={c.id} className="flex items-center gap-3.5 px-5 py-3.5">
                <span className="text-xl">{dua.icon}</span>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">{dua.title}</p>
                  <p className="text-[12px] text-white/40">
                    {at.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                    {" · "}
                    {at.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wide ${
                    c.method === "recited"
                      ? "bg-[#178360]/40 text-[#E6CE8C]"
                      : "bg-white/[0.06] text-white/40"
                  }`}
                >
                  {c.method === "recited" ? "RECITED" : "MANUAL"}
                </span>
              </div>
            );
          })}
        </Card>
      )}

      <BottomNav active="Streaks" />
    </AppScreen>
  );
}
