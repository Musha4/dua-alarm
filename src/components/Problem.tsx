const struggles = [
  {
    title: "You forget",
    body: "The morning rush takes over before you remember your adhkar — and by night, you're asleep before your bedtime dua.",
  },
  {
    title: "You rush",
    body: "Even when you remember, it's a hurried few seconds squeezed between snoozing the alarm and opening notifications.",
  },
  {
    title: "The habit fades",
    body: "You start strong after Ramadan or a good lecture. Then a few missed days become weeks, and the habit quietly disappears.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            Sound familiar?
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-night sm:text-4xl">
            You want the habit. Life gets in the way.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Most of us know the virtue of the morning and evening duas — and
            genuinely want them in our day. Wanting isn&apos;t the hard part.
            Remembering, every single day, is.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
          {struggles.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-cream-dark bg-white/60 p-7 shadow-sm"
            >
              <h3 className="font-display text-xl font-semibold text-night">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-night md:mt-12">
          Dua Alarm attaches your remembrance to the one thing you already do
          every single day — waking up to an alarm.
        </p>
      </div>
    </section>
  );
}
