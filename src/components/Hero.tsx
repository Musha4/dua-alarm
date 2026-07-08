"use client";

import { useEffect, useState } from "react";
import {
  HEADLINE_VARIANTS,
  getHeadlineVariant,
  trackEvent,
  type HeadlineVariant,
} from "@/lib/ab";
import PhoneMockup from "./PhoneMockup";

export default function Hero() {
  // Variant is resolved after mount (localStorage isn't available during SSR).
  // Until then we render the variant-A copy invisibly to reserve layout space,
  // then fade the assigned headline in — no flash of the wrong variant.
  const [variant, setVariant] = useState<HeadlineVariant | null>(null);

  useEffect(() => {
    const assigned = getHeadlineVariant();
    setVariant(assigned);
    trackEvent("headline_viewed");
  }, []);

  const copy = HEADLINE_VARIANTS[variant ?? "a"];

  return (
    <section id="top" className="relative overflow-hidden bg-night">
      <div className="pattern-star absolute inset-0 opacity-[0.07]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-24 md:pt-20">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-light ring-1 ring-cream/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Launching soon — early list open
          </p>

          <h1
            className={`mt-6 min-h-[2.2em] font-display text-[2.1rem] font-semibold leading-[1.15] text-cream transition-opacity duration-300 sm:text-5xl md:text-[3.25rem] ${
              variant === null ? "opacity-0" : "opacity-100"
            }`}
          >
            {copy.pre}
            <span className="text-gold-light">{copy.highlight}</span>
            {copy.post}
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-cream/75 md:mx-0">
            Dua Alarm only turns off once you&apos;ve recited your morning or
            bedtime dua — so remembrance becomes as automatic as waking up.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#waitlist"
              onClick={() => trackEvent("waitlist_cta_click", { location: "hero" })}
              className="w-full rounded-full bg-gold px-8 py-4 text-center text-base font-bold text-night shadow-lg shadow-gold/25 transition-all hover:-translate-y-0.5 hover:bg-gold-light sm:w-auto"
            >
              Get Early Access
            </a>
            <a
              href="#how-it-works"
              onClick={() => trackEvent("cta_click", { cta: "hero_how_it_works" })}
              className="w-full rounded-full px-8 py-4 text-center text-base font-semibold text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/10 sm:w-auto"
            >
              See How It Works
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-cream/55 md:justify-start">
            <li className="flex items-center gap-1.5">
              <CheckIcon /> Free to join
            </li>
            <li className="flex items-center gap-1.5">
              <CheckIcon /> Free Premium at launch
            </li>
            <li className="flex items-center gap-1.5">
              <CheckIcon /> No spam, ever
            </li>
          </ul>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-gold-light"
      aria-hidden="true"
    >
      <path d="m3 8.5 3 3 7-7" />
    </svg>
  );
}
