import type { ReactNode } from "react";

/**
 * iPhone 15 Pro-style frame for marketing mockups.
 * Fixed logical size (375×812) so exported screenshots are consistent.
 */
export default function IPhoneFrame({
  children,
  label,
  statusTime = "9:41",
  statusTone = "light",
}: {
  children: ReactNode;
  label?: string;
  /** Time shown in the status bar (Apple's marketing default is 9:41). */
  statusTime?: string;
  /** "light" = white glyphs (dark screens), "dark" = black glyphs. */
  statusTone?: "light" | "dark";
}) {
  return (
    <figure className="flex w-[403px] shrink-0 flex-col items-center gap-4">
      {/* Titanium body */}
      <div className="rounded-[62px] bg-gradient-to-b from-[#4a4a4e] via-[#2c2c2f] to-[#4a4a4e] p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="rounded-[59px] bg-black p-[9px]">
          {/* Screen */}
          <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[50px] bg-black">
            {children}

            {/* Status bar (overlaid) */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-9 pt-4 text-[15px] font-semibold ${
                statusTone === "light" ? "text-white" : "text-black"
              }`}
            >
              <span className="w-12 tracking-tight">{statusTime}</span>
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[14px] h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1.5">
                {/* Signal */}
                <svg viewBox="0 0 18 12" className="h-3 w-[18px] fill-current">
                  <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
                  <rect x="5" y="5" width="3" height="7" rx="1" />
                  <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                {/* Wi-Fi */}
                <svg viewBox="0 0 16 12" className="h-3 w-4 fill-current">
                  <path d="M8 9.6a1.7 1.7 0 0 1 1.7 1.7L8 12l-1.7-.7A1.7 1.7 0 0 1 8 9.6Zm0-4.4c1.9 0 3.6.7 4.9 1.9l-1.5 1.5A4.9 4.9 0 0 0 8 7.3c-1.3 0-2.5.5-3.4 1.3L3.1 7.1A6.9 6.9 0 0 1 8 5.2Zm0-4.2c3 0 5.8 1.2 7.9 3.1l-1.5 1.5A9.2 9.2 0 0 0 8 3.3c-2.5 0-4.7 1-6.4 2.6L.1 4.4A11.2 11.2 0 0 1 8 1Z" />
                </svg>
                {/* Battery */}
                <svg viewBox="0 0 27 12" className="h-3 w-[27px]">
                  <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" className="fill-none stroke-current opacity-40" />
                  <rect x="2" y="2" width="19" height="8" rx="2" className="fill-current" />
                  <path d="M24.5 4v4a2.2 2.2 0 0 0 0-4Z" className="fill-current opacity-40" />
                </svg>
              </span>
            </div>

            {/* Home indicator */}
            <div
              className={`pointer-events-none absolute bottom-2 left-1/2 z-40 h-[5px] w-[134px] -translate-x-1/2 rounded-full ${
                statusTone === "light" ? "bg-white/90" : "bg-black/85"
              }`}
            />
          </div>
        </div>
      </div>

      {label && (
        <figcaption className="text-sm font-medium text-white/50">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
