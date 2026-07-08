"use client";

import { trackEvent } from "@/lib/ab";

const faqs = [
  {
    question: "Is the app available now?",
    answer:
      "Not yet — we're building it right now. This page is where you can join the waitlist, and everyone on it gets early access (plus free Premium at launch) as soon as the first version is ready.",
  },
  {
    question: "Will it work on iPhone?",
    answer:
      "Yes. We're building Dua Alarm for both iPhone and Android, and both will launch with the same core features: dua alarms, streaks, and the full recitation experience.",
  },
  {
    question: "Will there be a free version?",
    answer:
      "Absolutely. The core experience — a morning and bedtime dua alarm with streak tracking — will always be free. Premium adds extras like the full dua library, advanced stats, and family mode.",
  },
  {
    question: "Can I choose different duas?",
    answer:
      "Yes. You'll pick from a curated collection of authentic morning and bedtime duas — including Ayat al-Kursi and daily adhkar — and can set a different dua for each alarm.",
  },
  {
    question: "Does it listen all the time?",
    answer:
      "No, never. Dua Alarm doesn't listen in the background at all. Completing an alarm is a simple tap after you recite — and if we ever add optional recitation detection, the microphone would only be active during the alarm itself, with nothing recorded or uploaded.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-cream pb-16 md:pb-24">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-night sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_opened", { question: faq.question });
                }
              }}
              className="group rounded-2xl border border-cream-dark bg-white/60 px-6 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-night [&::-webkit-details-marker]:hidden">
                {faq.question}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-12 rounded-3xl bg-night p-8 text-center sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-cream">
            Start your streak on day one
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-cream/65">
            Join the founding list — free Premium at launch, and a say in what
            we build first.
          </p>
          <a
            href="#waitlist"
            onClick={() => trackEvent("waitlist_cta_click", { location: "faq" })}
            className="mt-6 inline-block rounded-full bg-gold px-8 py-4 text-base font-bold text-night shadow-lg shadow-gold/25 transition-all hover:-translate-y-0.5 hover:bg-gold-light"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </section>
  );
}
