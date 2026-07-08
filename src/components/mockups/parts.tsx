import type { ReactNode } from "react";

/* Shared pieces for the app mockup screens.
   App design tokens (dark mode):
     surface   #0A1712 → #0D241C   (deep green-black)
     brand     #0E5A43 → #178360
     gold      #C9A227 / #E6CE8C
     cream     #F7F1E3                                        */

export function Pattern({ className = "opacity-[0.05]" }: { className?: string }) {
  return <div className={`pattern-star pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}

export function AppLogo({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-[22%] bg-gradient-to-b from-[#178360] to-[#0E5A43] shadow-[0_12px_30px_-8px_rgba(14,90,67,0.7)] ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="h-[62%] w-[62%]" aria-hidden="true">
        <path
          d="M28.5 20a11.5 11.5 0 1 1-9.7-11.36 9.2 9.2 0 1 0 9.55 13.4A11.6 11.6 0 0 0 28.5 20Z"
          fill="#F7F1E3"
        />
        <path
          d="m29.5 12 1.2 3.05 3.05 1.2-3.05 1.2-1.2 3.05-1.2-3.05-3.05-1.2 3.05-1.2 1.2-3.05Z"
          fill="#E6CE8C"
        />
      </svg>
    </div>
  );
}

const tabs = [
  {
    name: "Home",
    icon: <path d="M3 10.5 12 3l9 7.5M5.5 8.8V20a1 1 0 0 0 1 1H10v-5.5a2 2 0 0 1 4 0V21h3.5a1 1 0 0 0 1-1V8.8" />,
  },
  {
    name: "Alarms",
    icon: <path d="M12 7v5l3.2 2M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM4.5 3.5 2 6m19.5-2.5L24 6" />,
  },
  {
    name: "Duas",
    icon: <path d="M12 6.2C10.2 4.7 7.6 4.4 4 4.4V19c3.6 0 6.2.3 8 1.8 1.8-1.5 4.4-1.8 8-1.8V4.4c-3.6 0-6.2.3-8 1.8Zm0 0V20" />,
  },
  {
    name: "Profile",
    icon: <path d="M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 21a7.5 7.5 0 0 1 15 0" />,
  },
];

export function TabBar({ active = "Home" }: { active?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/[0.06] bg-[#0A1712]/85 px-6 pb-7 pt-3 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        {tabs.map((tab) => (
          <div key={tab.name} className="flex w-14 flex-col items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-[26px] w-[26px] ${tab.name === active ? "text-[#E6CE8C]" : "text-white/35"}`}
            >
              {tab.icon}
            </svg>
            <span className={`text-[10px] font-medium ${tab.name === active ? "text-[#E6CE8C]" : "text-white/35"}`}>
              {tab.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** SVG circular progress ring. */
export function Ring({
  size = 56,
  stroke = 5,
  progress,
  track = "rgba(255,255,255,0.1)",
  color = "#E6CE8C",
  children,
}: {
  size?: number;
  stroke?: number;
  progress: number; // 0–1
  track?: string;
  color?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/** Small glass card wrapper used across screens. */
export function Glass({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.08] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white/30">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
