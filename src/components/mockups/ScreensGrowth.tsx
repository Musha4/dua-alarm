import { Glass, Pattern, TabBar } from "./parts";

/* ============ 9. Streak ============ */
// July 2026 — the 1st falls on a Wednesday (offset 3, Sunday-first).
const JULY_OFFSET = 3;
const TODAY = 8;
const missedDays: number[] = []; // current 12-day streak runs into July

export function StreakScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-[#0D241C] to-[#07130E]">
      <Pattern className="opacity-[0.035]" />

      <div className="relative px-6 pb-32 pt-[74px]">
        <h1 className="text-center font-display text-[22px] font-semibold text-[#F7F1E3]">
          Your Streak
        </h1>

        {/* Stat cards */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            ["🔥", "12", "Current"],
            ["🏆", "21", "Longest"],
            ["📈", "87%", "Completion"],
          ].map(([icon, value, name]) => (
            <Glass key={name} className="flex flex-col items-center p-4">
              <span className="text-xl">{icon}</span>
              <p className="mt-1.5 text-[22px] font-bold leading-none text-[#F7F1E3]">{value}</p>
              <p className="mt-1 text-[11px] font-medium text-white/40">{name}</p>
            </Glass>
          ))}
        </div>

        {/* Calendar */}
        <Glass className="mt-4 p-5">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-semibold text-[#F7F1E3]">July 2026</p>
            <p className="text-[12px] font-medium text-[#E6CE8C]">Muharram 1448</p>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-[10px] font-semibold text-white/30">{d}</span>
            ))}
            {Array.from({ length: JULY_OFFSET }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const done = day < TODAY && !missedDays.includes(day);
              const isToday = day === TODAY;
              return (
                <span
                  key={day}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold ${
                    isToday
                      ? "bg-[#178360] text-[#F7F1E3] ring-2 ring-[#E6CE8C]/60"
                      : done
                        ? "bg-[#E6CE8C] text-[#0A1712]"
                        : day < TODAY
                          ? "text-white/30"
                          : "text-white/20"
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </Glass>

        {/* Achievements */}
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-wider text-white/40">
          Achievements
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[
            ["🌅", "Fajr Champion", "7 mornings straight", true],
            ["🔥", "Two Weeks", "14-day streak", true],
            ["📿", "Hafiz Heart", "Learn 5 duas", false],
          ].map(([icon, name, sub, unlocked]) => (
            <Glass key={String(name)} className={`flex flex-col items-center p-4 text-center ${unlocked ? "" : "opacity-45"}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${unlocked ? "bg-[#E6CE8C]/15" : "bg-white/[0.06]"}`}>
                {unlocked ? icon : "🔒"}
              </span>
              <p className="mt-2 text-[12px] font-semibold leading-tight text-[#F7F1E3]">{name}</p>
              <p className="mt-1 text-[10px] text-white/40">{sub}</p>
            </Glass>
          ))}
        </div>
      </div>

      <TabBar active="Alarms" />
    </div>
  );
}

/* ============ 10. Premium ============ */
const premiumFeatures = [
  ["⏰", "Unlimited alarms", "Morning, evening, and everything between"],
  ["📖", "Full dua library", "Complete adhkar with sources and audio"],
  ["👨‍👩‍👧‍👦", "Family Mode", "Build the habit together, see each other's streaks"],
  ["🌙", "Ramadan Mode", "Suhoor alarms and nightly Qur'an goals"],
  ["📱", "Home Screen Widgets", "Your streak and next dua at a glance"],
];

export function PremiumScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[#0D241C] to-[#07130E]">
      <Pattern className="opacity-[0.04]" />
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C9A227]/20 blur-3xl" />

      <div className="relative flex h-full flex-col px-6 pt-[74px]">
        <div className="flex justify-end">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.08] text-[13px] text-white/50">
            ✕
          </span>
        </div>

        <div className="text-center">
          <span className="text-4xl">👑</span>
          <h1 className="mt-2 font-display text-[28px] font-semibold tracking-tight text-[#F7F1E3]">
            Dua Alarm <span className="text-[#E6CE8C]">Premium</span>
          </h1>
          <p className="mt-1.5 text-[14px] text-white/50">
            Everything you need for a lifetime habit
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 flex flex-col gap-2.5">
          {premiumFeatures.map(([icon, name, sub]) => (
            <div key={name} className="flex items-center gap-3.5 rounded-2xl bg-white/[0.05] px-4 py-3 ring-1 ring-white/[0.07]">
              <span className="text-xl">{icon}</span>
              <div className="flex-1">
                <p className="text-[15px] font-semibold text-[#F7F1E3]">{name}</p>
                <p className="text-[12px] text-white/40">{sub}</p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="#E6CE8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m5 13 4 4 10-10" />
              </svg>
            </div>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/[0.08]">
            <p className="text-[13px] font-semibold text-white/60">Monthly</p>
            <p className="mt-1 text-[22px] font-bold text-[#F7F1E3]">
              $3.99<span className="text-[13px] font-medium text-white/40">/mo</span>
            </p>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-b from-[#E6CE8C]/20 to-[#C9A227]/10 p-4 ring-2 ring-[#E6CE8C]/60">
            <span className="absolute -top-2.5 right-3 rounded-full bg-[#E6CE8C] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#0A1712]">
              SAVE 37%
            </span>
            <p className="text-[13px] font-semibold text-[#E6CE8C]">Yearly</p>
            <p className="mt-1 text-[22px] font-bold text-[#F7F1E3]">
              $29.99<span className="text-[13px] font-medium text-white/40">/yr</span>
            </p>
          </div>
        </div>

        <div className="mt-auto pb-10">
          <button className="w-full rounded-2xl bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] py-[17px] text-[16px] font-bold text-[#0A1712] shadow-[0_12px_34px_-8px_rgba(201,162,39,0.6)]">
            Start 7-Day Free Trial
          </button>
          <p className="mt-3 text-center text-[11px] text-white/30">
            Cancel anytime · Restore purchase · Terms
          </p>
        </div>
      </div>
    </div>
  );
}
