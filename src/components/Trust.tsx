const pillars = [
  {
    title: "Authentic, referenced duas",
    body: "Every dua comes from established collections like Hisn al-Muslim, with its source shown right in the app — nothing made up, nothing unsourced.",
    icon: (
      // Open book with check
      <path d="M12 6.5C10 4.8 7 4.5 3 4.5v14c4 0 7 .3 9 2 2-1.7 5-2 9-2v-14c-4 0-7 .3-9 2Zm0 0v14M8.5 10.5l1.8 1.8 3.2-3.3" />
    ),
  },
  {
    title: "Privacy comes first",
    body: "No background listening, no ads, no selling your data. Completing an alarm is a simple tap after you recite — your worship stays between you and Allah.",
    icon: (
      // Shield with check
      <path d="M12 3 5 5.8v5c0 4.5 3 8.2 7 9.7 4-1.5 7-5.2 7-9.7v-5L12 3Zm-3 8.7 2.2 2.2 3.8-4" />
    ),
  },
  {
    title: "Free core, forever",
    body: "The essential habit — a morning and bedtime dua alarm with streaks — will always be free. Premium only adds extras on top.",
    icon: (
      // Heart
      <path d="M12 20s-7-4.3-9-9c-1.2-2.9.6-6.2 3.7-6.8 2-.4 4 .5 5.3 2.2 1.3-1.7 3.3-2.6 5.3-2.2 3.1.6 4.9 3.9 3.7 6.8-2 4.7-9 9-9 9Z" />
    ),
  },
];

export default function Trust() {
  return (
    <section id="trust" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            Built with amanah
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-night sm:text-4xl">
            An app you can trust with your worship
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-cream-dark bg-white/60 p-7 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-deep/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-emerald-deep"
                  aria-hidden="true"
                >
                  {pillar.icon}
                </svg>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-night">
                {pillar.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Founder note — edit this to make it personal */}
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-emerald-deep/[0.06] p-8 text-center ring-1 ring-emerald-deep/10">
          <p className="font-arabic text-2xl text-emerald-deep" lang="ar" dir="rtl">
            السَّلَامُ عَلَيْكُمْ
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            I&apos;m building Dua Alarm because I kept losing my own morning
            adhkar habit — strong for a week, gone by the next. I wanted the
            one alarm I never ignore to become the reminder I never miss.
            If that sounds like you, join the early list and help shape it.
          </p>
          <p className="mt-4 text-sm font-semibold text-night">
            — The founder of Dua Alarm
          </p>
        </div>
      </div>
    </section>
  );
}
