"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/ab";

const options = [
  { value: "yes", label: "Yes, if it helps me stay consistent" },
  { value: "maybe", label: "Maybe" },
  { value: "no", label: "No, I only want free" },
];

// The vote is stored locally so the waitlist form can attach it to the
// visitor's signup row (the `pricing_response` column in Supabase).
export const PRICING_VOTE_KEY = "dua-alarm.pricing-vote";

const premiumIncludes = [
  "The full dua & adhkar library",
  "Advanced streaks and habit stats",
  "Family mode — build the habit together",
];

export default function PricingPoll() {
  const [selected, setSelected] = useState<string | null>(null);

  function handleVote(value: string) {
    setSelected(value);

    // Remember the vote so WaitlistForm can save it to Supabase as
    // `pricing_response` when this visitor signs up.
    localStorage.setItem(PRICING_VOTE_KEY, value);

    // Logged with the visitor's headline variant attached (see src/lib/ab.ts).
    trackEvent("pricing_vote", { answer: value });
  }

  return (
    <section id="pricing" className="relative overflow-hidden bg-emerald-deep py-16 md:py-24">
      <div className="pattern-star absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-light">
          One honest question
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
          Would you consider Premium for $3.99/month?
        </h2>
        <p className="mt-4 text-lg text-cream/70">
          The core alarm stays free, always. Premium would add:
        </p>

        <ul className="mx-auto mt-5 flex max-w-sm flex-col gap-2.5 text-left">
          {premiumIncludes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-cream/85">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-1 h-4 w-4 shrink-0 text-gold-light"
                aria-hidden="true"
              >
                <path d="m3 8.5 3 3 7-7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md">
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

        <div aria-live="polite" className="mt-6 min-h-14">
          {selected !== null && (
            <div className="mx-auto max-w-md">
              <p className="text-sm font-medium text-gold-light">
                JazakAllahu khayran — your answer has been counted.
              </p>
              <p className="mt-2 text-sm text-cream/70">
                Whatever you answered, early members get Premium{" "}
                <span className="font-semibold text-cream">free at launch</span>{" "}
                —{" "}
                <a
                  href="#waitlist"
                  onClick={() => trackEvent("waitlist_cta_click", { location: "pricing" })}
                  className="font-semibold text-gold-light underline underline-offset-4 hover:text-gold"
                >
                  join the waitlist
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
