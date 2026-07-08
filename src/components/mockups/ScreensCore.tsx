import { ChevronRight, Glass, Pattern, Ring, TabBar } from "./parts";

/* ============ 3. Home ============ */
export function HomeScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-[#0D241C] to-[#07130E]">
      <Pattern className="opacity-[0.035]" />

      <div className="relative px-6 pb-32 pt-[74px]">
        {/* Greeting */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] font-medium text-[#E6CE8C]/80">
              23 Muharram, 1448 AH
            </p>
            <h1 className="mt-1 font-display text-[30px] font-semibold tracking-tight text-[#F7F1E3]">
              Good morning, Yusuf
            </h1>
          </div>
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-[#178360] to-[#0E5A43] text-[15px] font-bold text-[#F7F1E3] ring-2 ring-[#E6CE8C]/30">
            Y
          </div>
        </div>

        {/* Streak hero card */}
        <Glass className="mt-6 p-5">
          <div className="flex items-center gap-4">
            <Ring size={68} stroke={6} progress={0.75}>
              <span className="text-lg">🔥</span>
            </Ring>
            <div className="flex-1">
              <p className="text-[22px] font-bold leading-none text-[#F7F1E3]">
                12 day streak
              </p>
              <p className="mt-1.5 text-[13px] text-white/50">
                3 of 4 duas completed today
              </p>
            </div>
            <div className="rounded-full bg-[#E6CE8C]/15 px-3 py-1.5 text-[12px] font-semibold text-[#E6CE8C]">
              Best: 21
            </div>
          </div>
          {/* Week dots */}
          <div className="mt-4 flex justify-between border-t border-white/[0.06] pt-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-medium text-white/35">{d}</span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                    i < 3
                      ? "bg-[#E6CE8C] text-[#0A1712]"
                      : i === 3
                        ? "bg-[#178360] text-[#F7F1E3] ring-2 ring-[#E6CE8C]/50"
                        : "bg-white/[0.06] text-white/25"
                  }`}
                >
                  {i <= 3 ? "✓" : ""}
                </span>
              </div>
            ))}
          </div>
        </Glass>

        {/* Next alarm */}
        <Glass className="mt-4 flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0E5A43]/60 text-xl">
            🌙
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-medium uppercase tracking-wider text-white/40">
              Next alarm
            </p>
            <p className="mt-0.5 text-[17px] font-semibold text-[#F7F1E3]">
              10:30 PM · Bedtime Dua
            </p>
          </div>
          {/* iOS toggle */}
          <div className="flex h-[31px] w-[51px] items-center rounded-full bg-[#178360] p-[2px]">
            <span className="ml-auto h-[27px] w-[27px] rounded-full bg-white shadow" />
          </div>
        </Glass>

        {/* Quick actions */}
        <div className="mt-5 grid grid-cols-4 gap-3">
          {[
            ["＋", "New Alarm"],
            ["📖", "Duas"],
            ["🔥", "Streaks"],
            ["👑", "Premium"],
          ].map(([icon, name]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="flex h-[54px] w-full items-center justify-center rounded-2xl bg-white/[0.06] text-xl ring-1 ring-white/[0.08]">
                <span className={name === "New Alarm" ? "text-[#E6CE8C] text-2xl font-light" : ""}>{icon}</span>
              </div>
              <span className="text-[11px] font-medium text-white/50">{name}</span>
            </div>
          ))}
        </div>

        {/* Progress cards */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Glass className="p-4">
            <p className="text-[12px] font-medium text-white/45">This week</p>
            <p className="mt-1 text-[24px] font-bold text-[#F7F1E3]">
              6<span className="text-[15px] font-semibold text-white/40">/7 days</span>
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#178360] to-[#E6CE8C]" />
            </div>
          </Glass>
          <Glass className="p-4">
            <p className="text-[12px] font-medium text-white/45">Total recitations</p>
            <p className="mt-1 text-[24px] font-bold text-[#F7F1E3]">148</p>
            <p className="mt-2 text-[11px] font-medium text-[#E6CE8C]">↑ 23 this week</p>
          </Glass>
        </div>
      </div>

      <TabBar active="Home" />
    </div>
  );
}

/* ============ 4. Create Alarm ============ */
export function CreateAlarmScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-[#0D241C] to-[#07130E]">
      <Pattern className="opacity-[0.035]" />

      <div className="relative px-6 pt-[74px]">
        {/* Nav bar */}
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-[#E6CE8C]">Cancel</span>
          <span className="text-[17px] font-semibold text-[#F7F1E3]">New Alarm</span>
          <span className="text-[16px] font-semibold text-[#E6CE8C]">Save</span>
        </div>

        {/* Time picker (iOS wheel) */}
        <div className="relative mt-8 flex h-[188px] flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-x-2 top-1/2 h-[52px] -translate-y-1/2 rounded-2xl bg-white/[0.07]" />
          <div className="flex flex-col items-center gap-1 text-center leading-none">
            <span className="text-[26px] font-light text-white/15">6:29&nbsp;&nbsp;AM</span>
            <span className="relative py-2 text-[40px] font-semibold tracking-tight text-[#F7F1E3]">
              6:30 <span className="text-[28px] font-medium">AM</span>
            </span>
            <span className="text-[26px] font-light text-white/15">6:31&nbsp;&nbsp;AM</span>
          </div>
        </div>

        {/* Morning / Bedtime segmented control */}
        <div className="mt-5 flex rounded-2xl bg-white/[0.06] p-1 ring-1 ring-white/[0.08]">
          <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#178360] to-[#0E5A43] py-2.5 text-[15px] font-semibold text-[#F7F1E3] shadow">
            🌅 Morning
          </div>
          <div className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-[15px] font-medium text-white/45">
            🌙 Bedtime
          </div>
        </div>

        {/* Settings rows */}
        <Glass className="mt-5 divide-y divide-white/[0.06]">
          {[
            ["Repeat", "Every day"],
            ["Dua", "Morning Dua"],
            ["Sound", "Gentle Chime"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between px-5 py-4">
              <span className="text-[16px] text-[#F7F1E3]">{k}</span>
              <span className="flex items-center gap-2 text-[15px] text-white/45">
                {v} <ChevronRight />
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-[16px] text-[#F7F1E3]">Recite to dismiss</p>
              <p className="mt-0.5 text-[12px] text-white/40">
                Alarm turns off after your dua
              </p>
            </div>
            <div className="flex h-[31px] w-[51px] items-center rounded-full bg-[#178360] p-[2px]">
              <span className="ml-auto h-[27px] w-[27px] rounded-full bg-white shadow" />
            </div>
          </div>
        </Glass>

        <p className="mt-4 text-center text-[12px] text-white/30">
          Your dua will appear on screen when the alarm rings
        </p>
      </div>
    </div>
  );
}

/* ============ 5. Dua Selection ============ */
const duaCards = [
  {
    title: "Morning Dua",
    source: "Hisn al-Muslim · 30s",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    icon: "🌅",
    selected: true,
    pro: false,
  },
  {
    title: "Bedtime Dua",
    source: "Sahih al-Bukhari · 20s",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    icon: "🌙",
    selected: false,
    pro: false,
  },
  {
    title: "Ayat al-Kursi",
    source: "Al-Baqarah 2:255 · 1 min",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    icon: "📖",
    selected: false,
    pro: false,
  },
  {
    title: "Morning Adhkar",
    source: "7 duas · 6 min",
    arabic: "أَذْكَارُ الصَّبَاحِ",
    icon: "☀️",
    selected: false,
    pro: true,
  },
  {
    title: "Evening Adhkar",
    source: "7 duas · 6 min",
    arabic: "أَذْكَارُ الْمَسَاءِ",
    icon: "✨",
    selected: false,
    pro: true,
  },
];

export function DuaSelectionScreen() {
  return (
    <div className="relative h-full bg-gradient-to-b from-[#0D241C] to-[#07130E]">
      <Pattern className="opacity-[0.035]" />

      <div className="relative px-6 pt-[74px]">
        <div className="flex items-center justify-between">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#E6CE8C]">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          <span className="text-[17px] font-semibold text-[#F7F1E3]">Choose Dua</span>
          <span className="w-5" />
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/[0.08]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 text-white/35">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="text-[15px] text-white/35">Search duas…</span>
        </div>

        {/* Cards */}
        <div className="mt-5 flex flex-col gap-3">
          {duaCards.map((dua) => (
            <div
              key={dua.title}
              className={`flex items-center gap-4 rounded-3xl p-4 ring-1 backdrop-blur-xl ${
                dua.selected
                  ? "bg-[#0E5A43]/45 ring-[#E6CE8C]/40"
                  : "bg-white/[0.05] ring-white/[0.08]"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] text-2xl">
                {dua.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[16px] font-semibold text-[#F7F1E3]">{dua.title}</p>
                  {dua.pro && (
                    <span className="rounded-md bg-[#E6CE8C]/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-[#E6CE8C]">
                      PRO
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[12px] text-white/40">{dua.source}</p>
                <p className="mt-0.5 font-arabic text-[15px] leading-[1.9] text-[#E6CE8C]/85" lang="ar" dir="rtl">
                  {dua.arabic}
                </p>
              </div>
              {dua.selected ? (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6CE8C]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0A1712" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="m5 13 4 4 10-10" />
                  </svg>
                </div>
              ) : (
                <div className="h-6 w-6 shrink-0 rounded-full ring-1 ring-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
