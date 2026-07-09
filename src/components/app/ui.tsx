"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/* Shared UI for the Dua Alarm app. Palette matches the marketing mockups:
   surface #0D241C→#07130E, brand #0E5A43/#178360, gold #E6CE8C/#C9A227,
   cream #F7F1E3. Layout is a centered 430px column — iPhone-like on
   desktop, edge-to-edge on phones. */

export function AppScreen({
  children,
  withNav = false,
}: {
  children: ReactNode;
  withNav?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0D241C] to-[#07130E] text-[#F7F1E3]">
      <div className="pattern-star pointer-events-none fixed inset-0 opacity-[0.03]" aria-hidden="true" />
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-5 pt-6 ${
          withNav ? "pb-28" : "pb-8"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-3xl bg-white/[0.06] ring-1 ring-white/[0.08] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export function GoldButton({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl bg-gradient-to-b from-[#E6CE8C] to-[#C9A227] py-4 text-[16px] font-bold text-[#0A1712] shadow-[0_10px_30px_-8px_rgba(201,162,39,0.5)] transition-transform active:scale-[0.98] disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function GreenButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl bg-gradient-to-b from-[#178360] to-[#0E5A43] py-4 text-[16px] font-semibold text-[#F7F1E3] shadow-[0_10px_30px_-8px_rgba(14,90,67,0.7)] transition-transform active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}

export function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`flex h-[31px] w-[51px] shrink-0 items-center rounded-full p-[2px] transition-colors ${
        on ? "bg-[#178360]" : "bg-white/15"
      }`}
    >
      <span
        className={`h-[27px] w-[27px] rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[20px]" : ""
        }`}
      />
    </button>
  );
}

export function BackHeader({
  title,
  backHref = "/app",
  right,
}: {
  title: string;
  backHref?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <Link href={backHref} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[#E6CE8C]">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </Link>
      <h1 className="text-[17px] font-semibold">{title}</h1>
      <div className="flex h-9 w-9 items-center justify-center">{right}</div>
    </div>
  );
}

const navItems = [
  {
    href: "/app",
    name: "Home",
    icon: <path d="M3 10.5 12 3l9 7.5M5.5 8.8V20a1 1 0 0 0 1 1H10v-5.5a2 2 0 0 1 4 0V21h3.5a1 1 0 0 0 1-1V8.8" />,
  },
  {
    href: "/app/new",
    name: "New Alarm",
    icon: <path d="M12 8v8m-4-4h8m5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  },
  {
    href: "/app/duas",
    name: "Duas",
    icon: <path d="M12 6.2C10.2 4.7 7.6 4.4 4 4.4V19c3.6 0 6.2.3 8 1.8 1.8-1.5 4.4-1.8 8-1.8V4.4c-3.6 0-6.2.3-8 1.8Zm0 0V20" />,
  },
  {
    href: "/app/streaks",
    name: "Streaks",
    icon: <path d="M12 3c.8 3.4-.6 5.5-2.2 7.3C8.3 12 7 13.5 7 15.8A5 5 0 0 0 12 21a5 5 0 0 0 5-5.2c0-1.5-.5-2.8-1.3-4-.4.9-1 1.5-1.9 1.9.4-3.3-.3-8-1.8-10.7Z" />,
  },
];

export function BottomNav({ active }: { active: string }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-white/[0.06] bg-[#0A1712]/90 px-6 pb-6 pt-3 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="flex w-16 flex-col items-center gap-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-[26px] w-[26px] ${item.name === active ? "text-[#E6CE8C]" : "text-white/35"}`}
            >
              {item.icon}
            </svg>
            <span className={`text-[10px] font-medium ${item.name === active ? "text-[#E6CE8C]" : "text-white/35"}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
