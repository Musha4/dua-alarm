const steps = [
  {
    number: "1",
    title: "Set your alarm",
    body: "Pick your wake-up time and your wind-down time for bed — just like any alarm app.",
  },
  {
    number: "2",
    title: "Choose your dua",
    body: "Select a morning or bedtime dua from an authentic collection, with Arabic, transliteration, and translation.",
  },
  {
    number: "3",
    title: "Recite to complete",
    body: "When the alarm rings, your dua appears on screen. Recite it, then mark it complete to dismiss the alarm.",
  },
  {
    number: "4",
    title: "Build your streak",
    body: "Every completed dua grows your streak — a gentle push to keep your remembrance consistent, day after day.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-emerald-deep py-20 md:py-28">
      <div className="pattern-star absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-light">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
            Four steps to a habit that sticks
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-cream/[0.07] p-7 ring-1 ring-cream/15"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-night">
                {step.number}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
