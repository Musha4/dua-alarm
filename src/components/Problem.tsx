const struggles = [
  {
    title: "You forget",
    body: "The morning rush takes over before you remember your adhkar, and by night you're asleep before your bedtime dua.",
  },
  {
    title: "You rush",
    body: "Even when you remember, it's a hurried few seconds between snoozing the alarm and checking notifications.",
  },
  {
    title: "The habit fades",
    body: "You start strong after Ramadan or a good lecture — then a few missed days become weeks, and the habit quietly disappears.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            The struggle is real
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-night sm:text-4xl">
            You want the habit. Life gets in the way.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Most of us know the virtue of the morning and evening duas — and
            genuinely want them in our day. But wanting isn&apos;t the hard
            part. Remembering, every single day, is.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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

        <p className="mx-auto mt-12 max-w-2xl text-center text-lg font-medium text-night">
          Dua Alarm turns the one thing you already do every day — waking up to
          an alarm — into the anchor for your remembrance.
        </p>
      </div>
    </section>
  );
}
