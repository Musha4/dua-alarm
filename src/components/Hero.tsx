import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-night">
      {/* Subtle geometric pattern overlay */}
      <div className="pattern-star absolute inset-0 opacity-[0.07]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-2 md:pb-28 md:pt-24">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-light ring-1 ring-cream/15">
            Coming soon · Join the early list
          </p>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl md:text-6xl">
            Wake up with <span className="text-gold-light">remembrance.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-cream/75 md:mx-0">
            An Islamic habit alarm that helps you start and end your day with
            dua.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#waitlist"
              className="w-full rounded-full bg-gold px-8 py-3.5 text-center text-sm font-bold text-night shadow-lg shadow-gold/25 transition-colors hover:bg-gold-light sm:w-auto"
            >
              Join the Waitlist
            </a>
            <a
              href="#how-it-works"
              className="w-full rounded-full px-8 py-3.5 text-center text-sm font-semibold text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/10 sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          <p className="mt-6 text-sm text-cream/50">
            Free to join · Be the first to try it
          </p>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}
