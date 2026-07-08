const features = [
  {
    title: "Morning dua alarm",
    body: "Wake up to your chosen morning dua instead of a jarring buzzer. Start the day with dhikr before anything else reaches you.",
    icon: (
      // Sunrise
      <path d="M12 3v3m-6.4-.4 2.1 2.1M3 12h3m12 0h3m-4.7-4.3 2.1-2.1M5 18a7 7 0 0 1 14 0M2 21h20" />
    ),
  },
  {
    title: "Bedtime dua alarm",
    body: "A gentle evening reminder that walks you through your bedtime dua, so you end the day the way the Sunnah encourages.",
    icon: (
      // Crescent moon
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    ),
  },
  {
    title: "Arabic, transliteration & translation",
    body: "Every dua shown three ways — clear Arabic script, easy transliteration, and English meaning — so everyone can recite with understanding.",
    icon: (
      // Open book
      <path d="M12 6.5C10 4.8 7 4.5 3 4.5v14c4 0 7 .3 9 2 2-1.7 5-2 9-2v-14c-4 0-7 .3-9 2Zm0 0v14" />
    ),
  },
  {
    title: "Streak tracking",
    body: "Watch your consistency grow with daily streaks and gentle milestones — motivation without guilt.",
    icon: (
      // Flame
      <path d="M12 3c.8 3.4-.6 5.5-2.2 7.3C8.3 12 7 13.5 7 15.8A5 5 0 0 0 12 21a5 5 0 0 0 5-5.2c0-1.5-.5-2.8-1.3-4-.4.9-1 1.5-1.9 1.9.4-3.3-.3-8-1.8-10.7Z" />
    ),
  },
  {
    title: "Adhkar & family mode — coming next",
    body: "Full morning and evening adhkar sets, plus a family mode to build the habit together with your spouse and kids.",
    icon: (
      // People
      <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 .5a3 3 0 1 0 0-6M2.5 20a6.5 6.5 0 0 1 13 0m2-5.5a5.5 5.5 0 0 1 4 5.5" />
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            Features
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-night sm:text-4xl">
            Everything you need to stay consistent
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-cream-dark bg-white/60 p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-deep/10">
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
                  {feature.icon}
                </svg>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-night">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
