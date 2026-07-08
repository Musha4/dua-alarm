import { Glass, Pattern, Ring } from "./parts";

/* ============ 6. Alarm Ringing ============ */
export function AlarmRingingScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[#123A2C] via-[#0A1712] to-[#06100C]">
      <Pattern className="opacity-[0.05]" />
      {/* Soft glowing dawn */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#E6CE8C]/15 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#178360]/15 blur-3xl" />

      <div className="relative flex h-full flex-col items-center px-7 pt-[86px] text-center">
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#E6CE8C]/85">
          <span className="h-1.5 w-1.5 animate-[shimmer-dot_1s_ease-in-out_infinite] rounded-full bg-[#E6CE8C]" />
          Fajr Alarm
        </p>
        <p className="mt-2 text-[72px] font-semibold leading-none tracking-tight text-[#F7F1E3]">
          6:30<span className="ml-1 text-[30px] font-medium text-white/50">AM</span>
        </p>
        <p className="mt-3 rounded-full bg-white/[0.07] px-4 py-1.5 text-[13px] font-semibold text-[#E6CE8C] ring-1 ring-white/10">
          🌅 Morning Dua
        </p>

        {/* Dua card */}
        <Glass className="mt-6 w-full p-6">
          <p className="font-arabic text-[26px] leading-[2] text-[#F7F1E3] [text-wrap:balance]" lang="ar" dir="rtl">
            أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ
          </p>
          <p className="mt-3 text-[13px] italic text-[#E6CE8C]/80">
            Asbahna wa asbahal-mulku lillah, walhamdu lillah
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            “We have entered the morning, and the dominion belongs to Allah,
            and all praise is for Allah.”
          </p>
        </Glass>

        {/* Mic button with pulsing rings */}
        <div className="relative mt-auto mb-8 flex flex-col items-center">
          <div className="relative flex h-[92px] w-[92px] items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#E6CE8C]/25 animate-[ring-pulse_2s_ease-out_infinite]" />
            <span className="absolute inset-0 rounded-full bg-[#E6CE8C]/25 animate-[ring-pulse_2s_ease-out_infinite]" style={{ animationDelay: "0.7s" }} />
            <div className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] shadow-[0_16px_40px_-8px_rgba(201,162,39,0.7)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0A1712" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9">
                <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
                <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21m-3.5 0h7" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-[17px] font-semibold text-[#F7F1E3]">Start Reciting</p>
          <p className="mt-1.5 text-[12px] text-white/40">
            Alarm turns off after you recite
          </p>
          <p className="mt-5 text-[14px] font-medium text-white/35">
            Snooze · 5 min
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============ 7. Listening ============ */
const bars = [14, 26, 40, 30, 48, 36, 54, 28, 44, 34, 22, 38, 50, 26, 16];
const words = [
  ["Asbahna", true],
  ["wa", true],
  ["asbahal-mulku", true],
  ["lillah,", true],
  ["walhamdu", false],
  ["lillah", false],
] as const;

export function ListeningScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[#123A2C] via-[#0A1712] to-[#06100C]">
      <Pattern className="opacity-[0.04]" />
      <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-[#178360]/20 blur-3xl" />

      <div className="relative flex h-full flex-col items-center px-7 pt-[100px] text-center">
        {/* Progress ring around mic */}
        <Ring size={150} stroke={7} progress={0.64} color="#E6CE8C" track="rgba(255,255,255,0.08)">
          <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-gradient-to-b from-[#178360] to-[#0E5A43] shadow-[0_16px_40px_-10px_rgba(14,90,67,0.9)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F7F1E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10">
              <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
              <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21m-3.5 0h7" />
            </svg>
          </div>
        </Ring>

        <p className="mt-6 flex items-center gap-2 text-[19px] font-semibold text-[#F7F1E3]">
          Listening
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-1 rounded-full bg-[#E6CE8C] animate-[shimmer-dot_1.2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </p>
        <p className="mt-1 text-[13px] text-white/40">64% complete — keep going</p>

        {/* Waveform */}
        <div className="mt-8 flex h-16 items-center gap-[5px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-[5px] origin-center rounded-full bg-gradient-to-t from-[#178360] to-[#E6CE8C] animate-[wave_1.1s_ease-in-out_infinite]"
              style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        {/* Real-time transcription */}
        <Glass className="mt-8 w-full p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Hearing you recite
          </p>
          <p className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[16px] font-medium leading-relaxed">
            {words.map(([w, done]) => (
              <span key={w} className={done ? "text-[#E6CE8C]" : "text-white/25"}>
                {w}
              </span>
            ))}
          </p>
          <p className="mt-3 font-arabic text-[17px] leading-[1.9] text-white/45" lang="ar" dir="rtl">
            أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ …
          </p>
        </Glass>

        <p className="mt-auto mb-12 text-[13px] font-medium text-white/30">
          Can&apos;t speak right now? <span className="text-[#E6CE8C]/80">Tap to complete</span>
        </p>
      </div>
    </div>
  );
}

/* ============ 8. Success ============ */
export function SuccessScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-[#123A2C] via-[#0A1712] to-[#06100C]">
      <Pattern className="opacity-[0.04]" />
      <div className="absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-[#E6CE8C]/15 blur-3xl" />

      {/* Confetti dots */}
      {[
        [60, 130, "#E6CE8C"], [310, 110, "#178360"], [90, 230, "#F7F1E3"], [300, 250, "#E6CE8C"],
        [50, 330, "#178360"], [330, 350, "#F7F1E3"], [140, 90, "#E6CE8C"], [250, 70, "#178360"],
      ].map(([x, y, c], i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-full animate-[soft-float_3s_ease-in-out_infinite]"
          style={{ left: Number(x), top: Number(y), backgroundColor: String(c), opacity: 0.7, animationDelay: `${i * 0.3}s` }}
        />
      ))}

      <div className="relative flex h-full flex-col items-center px-7 pt-[120px] text-center">
        {/* Check burst */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <span
              key={deg}
              className="absolute h-4 w-[3px] rounded-full bg-[#E6CE8C]/50"
              style={{ transform: `rotate(${deg}deg) translateY(-72px)` }}
            />
          ))}
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] shadow-[0_20px_50px_-10px_rgba(201,162,39,0.7)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0A1712" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14">
              <path d="m5 13 4.5 4.5L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="mt-8 font-display text-[32px] font-semibold tracking-tight text-[#F7F1E3]">
          Dua completed
        </h2>
        <p className="mt-2 text-[15px] text-white/50">
          MashaAllah — your morning began with remembrance.
        </p>

        {/* Streak card */}
        <Glass className="mt-8 flex w-full items-center gap-4 p-5">
          <span className="text-4xl">🔥</span>
          <div className="flex-1 text-left">
            <p className="text-[22px] font-bold leading-none text-[#F7F1E3]">
              12 day streak
            </p>
            <p className="mt-1.5 text-[13px] text-white/50">
              9 more days to beat your record
            </p>
          </div>
          <span className="rounded-full bg-[#178360]/50 px-3 py-1.5 text-[13px] font-bold text-[#E6CE8C]">
            +1
          </span>
        </Glass>

        <div className="mt-auto mb-12 w-full">
          <button className="w-full rounded-2xl bg-gradient-to-b from-[#178360] to-[#0E5A43] py-[17px] text-[16px] font-semibold text-[#F7F1E3] shadow-[0_10px_30px_-8px_rgba(14,90,67,0.8)]">
            Continue
          </button>
          <p className="mt-4 text-[14px] font-medium text-[#E6CE8C]/70">
            Share your streak
          </p>
        </div>
      </div>
    </div>
  );
}
