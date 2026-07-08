export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* Soft gold glow behind the phone */}
      <div
        className="absolute -inset-10 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Phone frame */}
      <div className="relative rounded-[3rem] bg-[#04140e] p-[3px] shadow-2xl shadow-black/50 ring-1 ring-cream/10">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-24 h-8 w-[3px] rounded-l bg-cream/20" aria-hidden="true" />
        <div className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l bg-cream/20" aria-hidden="true" />
        <div className="absolute -right-[2px] top-28 h-14 w-[3px] rounded-r bg-cream/20" aria-hidden="true" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.85rem] bg-gradient-to-b from-forest via-night to-[#061a12]">
          {/* Screen sheen */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream/[0.06] via-transparent to-transparent"
            aria-hidden="true"
          />

          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pt-4 text-[10px] font-semibold text-cream/80">
            <span>6:30</span>
            <div className="h-6 w-24 rounded-full bg-[#04140e]" aria-hidden="true" />
            <div className="flex items-center gap-1" aria-hidden="true">
              {/* Signal */}
              <svg viewBox="0 0 14 10" className="h-2.5 w-3.5 fill-cream/80">
                <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                <rect x="3.8" y="4" width="2.5" height="6" rx="0.5" />
                <rect x="7.6" y="2" width="2.5" height="8" rx="0.5" />
                <rect x="11.4" y="0" width="2.5" height="10" rx="0.5" />
              </svg>
              {/* Battery */}
              <svg viewBox="0 0 22 10" className="h-2.5 w-5">
                <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" className="fill-none stroke-cream/60" />
                <rect x="2" y="2" width="13" height="6" rx="1.5" className="fill-cream/80" />
                <rect x="20" y="3" width="2" height="4" rx="1" className="fill-cream/60" />
              </svg>
            </div>
          </div>

          <div className="px-6 pb-7 pt-5 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-light/80">
              Fajr Alarm · Ringing
            </p>
            <p className="mt-1.5 font-display text-[3.4rem] font-semibold leading-none text-cream">
              6:30
              <span className="ml-1 text-xl font-medium text-cream/60">AM</span>
            </p>

            {/* Dua card */}
            <div className="mt-5 rounded-2xl bg-cream/[0.08] p-5 text-center ring-1 ring-cream/15 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                  Morning Dua
                </p>
                <p className="text-[10px] font-medium text-cream/50">
                  Hisn al-Muslim
                </p>
              </div>
              <p
                className="mt-3 font-arabic text-[1.35rem] leading-relaxed text-cream"
                lang="ar"
                dir="rtl"
              >
                أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
              </p>
              <p className="mt-2 text-[11px] italic text-cream/70">
                Asbahna wa asbahal-mulku lillah
              </p>
              <p className="mt-1 text-[11px] leading-snug text-cream/60">
                “We have entered the morning, and the dominion belongs to Allah.”
              </p>
            </div>

            {/* Start Reciting button */}
            <div className="mt-5 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-night shadow-lg shadow-gold/30">
              Start Reciting
            </div>
            <p className="mt-2.5 text-[10px] text-cream/45">
              Alarm turns off after you recite
            </p>

            {/* Streak */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream/[0.08] px-4 py-2 ring-1 ring-cream/15">
              <svg viewBox="0 0 20 20" className="h-4 w-4 text-gold-light" fill="currentColor" aria-hidden="true">
                <path d="M10 1.5c.6 2.6-.4 4.3-1.6 5.7C7.2 8.6 6 10 6 12.2A4.4 4.4 0 0 0 10 16.5a4.4 4.4 0 0 0 4-4.3c0-1.2-.4-2.2-1-3.2-.3.7-.8 1.2-1.5 1.5.3-2.7-.3-6.6-1.5-9Z" />
              </svg>
              <span className="text-xs font-semibold text-cream">
                Streak: 7 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
