export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Soft gold glow behind the phone */}
      <div
        className="absolute -inset-8 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Phone frame */}
      <div className="relative rounded-[2.75rem] border border-night/60 bg-night p-2.5 shadow-2xl shadow-night/40">
        {/* Screen */}
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-forest to-night">
          {/* Notch */}
          <div className="flex justify-center pt-3">
            <div className="h-6 w-28 rounded-full bg-night" />
          </div>

          <div className="px-6 pb-8 pt-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-light/80">
              Fajr Alarm
            </p>
            <p className="mt-2 font-display text-5xl font-semibold text-cream">
              6:30
              <span className="ml-1 text-2xl font-medium text-cream/70">AM</span>
            </p>

            {/* Dua card */}
            <div className="mt-6 rounded-2xl bg-cream/10 p-5 ring-1 ring-cream/15">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                Morning Dua
              </p>
              <p
                className="mt-3 font-arabic text-xl leading-relaxed text-cream"
                lang="ar"
                dir="rtl"
              >
                أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ
              </p>
              <p className="mt-2 text-xs italic text-cream/70">
                Asbahna wa asbahal-mulku lillah
              </p>
              <p className="mt-1 text-xs text-cream/60">
                “We have entered the morning, and the dominion belongs to Allah.”
              </p>
            </div>

            {/* Start Reciting button */}
            <div className="mt-6 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-night shadow-lg shadow-gold/30">
              Start Reciting
            </div>

            {/* Streak */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 ring-1 ring-cream/15">
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
