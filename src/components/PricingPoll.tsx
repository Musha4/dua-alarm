"use client";

import { useState } from "react";

const options = [
  {
    value: "yes",
    label: "Yes, if it helps me stay consistent",
  },
  {
    value: "maybe",
    label: "Maybe",
  },
  {
    value: "no",
    label: "No, I only want free",
  },
];

export default function PricingPoll() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleVote(value: string) {
    setSelected(value);

    // For now we just log the vote locally.
    console.log("[Dua Alarm] Pricing poll response:", { answer: value });

    // TODO: Persist the vote to Supabase, e.g.:
    //   await supabase.from("pricing_votes").insert({ answer: value });
    // Or send it to any analytics tool (Plausible, PostHog, GA4) as a custom event.
  }

  return (
    <section id="pricing" className="relative overflow-hidden bg-emerald-deep py-20 md:py-28">
      <div className="pattern-star absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-light">
          Help us shape it
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
          Would you consider Premium for $3.99/month?
        </h2>
        <p className="mt-4 text-lg text-cream/70">
          Premium would unlock the full dua library, advanced streaks, and
          family mode. Your honest answer helps us build the right thing.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:mx-auto sm:max-w-md">
          {options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleVote(option.value)}
                aria-pressed={isSelected}
                className={`rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
                  isSelected
                    ? "bg-gold text-night shadow-lg shadow-gold/25"
                    : "bg-cream/10 text-cream ring-1 ring-cream/25 hover:bg-cream/20"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="mt-6 min-h-6 text-sm font-medium text-gold-light"
        >
          {selected !== null &&
            "JazakAllahu khayran — your answer has been counted."}
        </p>
      </div>
    </section>
  );
}
