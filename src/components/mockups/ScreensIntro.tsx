import { AppLogo, Pattern } from "./parts";

/* ============ 1. Splash ============ */
export function SplashScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#0D241C] via-[#0A1712] to-[#06100C]">
      <Pattern className="opacity-[0.04]" />
      {/* Radial glow behind logo */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#178360]/25 blur-3xl" />

      <div className="relative animate-[soft-float_4s_ease-in-out_infinite]">
        <AppLogo className="h-24 w-24" />
      </div>
      <p className="relative mt-7 font-display text-[28px] font-semibold tracking-tight text-[#F7F1E3]">
        Dua Alarm
      </p>
      <p className="relative mt-1.5 text-[13px] font-medium tracking-wide text-[#E6CE8C]/70">
        Wake up with remembrance
      </p>

      {/* Loading dots */}
      <div className="absolute bottom-24 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-[#E6CE8C] animate-[shimmer-dot_1.2s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============ 2. Onboarding ============ */
function OnboardingShell({
  step,
  visual,
  title,
  body,
  cta,
}: {
  step: number;
  visual: React.ReactNode;
  title: React.ReactNode;
  body: string;
  cta: string;
}) {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-[#0D241C] to-[#06100C]">
      <Pattern className="opacity-[0.04]" />
      <div className="flex justify-end px-7 pt-16">
        <span className="text-[15px] font-medium text-white/40">Skip</span>
      </div>

      <div className="relative flex flex-1 items-center justify-center">{visual}</div>

      <div className="relative px-8 pb-16">
        <h2 className="font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-[#F7F1E3]">
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/55">{body}</p>

        <div className="mt-7 flex items-center gap-1.5">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-[7px] rounded-full transition-all ${
                i === step ? "w-6 bg-[#E6CE8C]" : "w-[7px] bg-white/20"
              }`}
            />
          ))}
        </div>

        <button className="mt-7 w-full rounded-2xl bg-gradient-to-b from-[#178360] to-[#0E5A43] py-[17px] text-[16px] font-semibold text-[#F7F1E3] shadow-[0_10px_30px_-8px_rgba(14,90,67,0.8)]">
          {cta}
        </button>
      </div>
    </div>
  );
}

export function Onboarding1() {
  return (
    <OnboardingShell
      step={1}
      title={
        <>
          Build the habit of{" "}
          <span className="text-[#E6CE8C]">remembering Allah</span>
        </>
      }
      body="Dua Alarm turns your daily alarms into moments of dhikr — so consistency stops depending on memory."
      cta="Get Started"
      visual={
        <div className="relative flex h-64 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#178360]/20 blur-2xl" />
          {/* Orbiting star ring */}
          <div className="absolute inset-2 rounded-full border border-[#E6CE8C]/20" />
          <div className="absolute inset-8 rounded-full border border-[#E6CE8C]/15" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <span
              key={deg}
              className="absolute h-2 w-2 rounded-full bg-[#E6CE8C]/60"
              style={{ transform: `rotate(${deg}deg) translateX(120px)` }}
            />
          ))}
          <p className="relative font-arabic text-5xl leading-[1.6] text-[#F7F1E3]" lang="ar" dir="rtl">
            ذِكْر
          </p>
        </div>
      }
    />
  );
}

export function Onboarding2() {
  return (
    <OnboardingShell
      step={2}
      title={
        <>
          Wake up with your <span className="text-[#E6CE8C]">morning dua</span>
        </>
      }
      body="Your alarm rings, your dua appears. Recite it to turn the alarm off — and start the day with Allah before anything else."
      cta="Continue"
      visual={
        <div className="relative flex h-64 w-full items-center justify-center">
          {/* Sunrise */}
          <div className="absolute bottom-6 left-1/2 h-40 w-72 -translate-x-1/2 overflow-hidden">
            <div className="absolute bottom-[-64px] left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#C9A227] to-[#E6CE8C] opacity-90 blur-[1px]" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 h-40 -translate-x-1/2 rounded-full border border-[#E6CE8C]/25"
                style={{ width: `${176 + i * 56}px`, bottom: `${-88 - i * 28}px`, height: `${176 + i * 56}px` }}
              />
            ))}
          </div>
          <div className="absolute bottom-6 h-px w-72 bg-gradient-to-r from-transparent via-[#E6CE8C]/50 to-transparent" />
          <p className="relative -mt-10 rounded-2xl bg-white/[0.07] px-5 py-2 font-arabic text-xl leading-[2.1] text-[#F7F1E3] ring-1 ring-white/10 backdrop-blur" lang="ar" dir="rtl">
            أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
          </p>
        </div>
      }
    />
  );
}

export function Onboarding3() {
  return (
    <OnboardingShell
      step={3}
      title={
        <>
          Sleep with your <span className="text-[#E6CE8C]">bedtime dua</span>
        </>
      }
      body="A gentle wind-down reminder walks you through your night dua — ending the day the way the Sunnah encourages."
      cta="Continue"
      visual={
        <div className="relative flex h-64 w-full items-center justify-center">
          {/* Crescent + stars */}
          <div className="absolute right-16 top-4 h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-[#E6CE8C]" />
            <div className="absolute -right-3 -top-2 h-24 w-24 rounded-full bg-[#0A1712]" />
          </div>
          {[
            [40, 30, 2], [80, 70, 1.5], [270, 40, 2], [230, 100, 1.5], [60, 130, 2], [300, 140, 1.5],
          ].map(([x, y, s], i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[#F7F1E3]/70 animate-[shimmer-dot_2.4s_ease-in-out_infinite]"
              style={{ left: x, top: y, width: `${s}px`, height: `${s}px`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
          <p className="relative mt-24 rounded-2xl bg-white/[0.07] px-5 py-2 font-arabic text-xl leading-[2.1] text-[#F7F1E3] ring-1 ring-white/10 backdrop-blur" lang="ar" dir="rtl">
            اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا
          </p>
        </div>
      }
    />
  );
}
