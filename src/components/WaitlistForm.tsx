"use client";

import { useState, type FormEvent } from "react";
import { getHeadlineVariant, trackEvent } from "@/lib/ab";

const featureOptions = [
  "Morning dua alarm",
  "Bedtime dua alarm",
  "Ayat al-Kursi",
  "Daily adhkar",
  "Family mode",
];

const memberPerks = [
  "First access when the app launches",
  "Premium free at launch, as a founding member",
  "A say in which duas and features come first",
];

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const entry = {
      name: formData.get("name"),
      email: formData.get("email"),
      mostExcitedAbout: formData.get("feature"),
      headlineVariant: getHeadlineVariant(),
      submittedAt: new Date().toISOString(),
    };

    // Logged with the visitor's headline variant so you can compare
    // signup conversion across headlines A/B/C (see src/lib/ab.ts).
    trackEvent("waitlist_signup", entry);

    // TODO: Connect a real backend. Two easy options:
    //
    // Option A — Supabase:
    //   1. `npm install @supabase/supabase-js`
    //   2. Create a `waitlist` table (name text, email text, feature text,
    //      headline_variant text, created_at timestamptz).
    //   3. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
    //   4. Replace the trackEvent above with:
    //        await supabase.from("waitlist").insert(entry);
    //
    // Option B — ConvertKit (email list):
    //   1. Create a form in ConvertKit and grab its form ID + API key.
    //   2. POST to https://api.convertkit.com/v3/forms/<FORM_ID>/subscribe
    //      with { api_key, email, first_name } — ideally from a Next.js
    //      route handler (src/app/api/waitlist/route.ts) so the key stays
    //      server-side. Pass the headline variant as a subscriber tag/field.

    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-xl px-5 sm:px-6">
        <div className="rounded-3xl border border-cream-dark bg-white/70 p-7 shadow-lg shadow-night/5 sm:p-10">
          {submitted ? (
            <div className="py-8 text-center" aria-live="polite">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-emerald-deep"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-night">
                JazakAllahu khayran — you&apos;re in!
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                You&apos;re on the founding list. We&apos;ll email you the
                moment Dua Alarm is ready — and your free Premium will be
                waiting. Keep us in your duas.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
                  Founding member list
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-night">
                  Be first to wake up with dua
                </h2>
              </div>

              <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5">
                {memberPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-ink-soft">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                      aria-hidden="true"
                    >
                      <path d="m3 8.5 3 3 7-7" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-night"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-night placeholder:text-ink-soft/50 focus:border-emerald-deep focus:outline-none focus:ring-2 focus:ring-emerald-deep/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-night"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-cream-dark bg-cream px-4 py-3 text-night placeholder:text-ink-soft/50 focus:border-emerald-deep focus:outline-none focus:ring-2 focus:ring-emerald-deep/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="feature"
                    className="mb-1.5 block text-sm font-semibold text-night"
                  >
                    Which feature are you most excited about?
                  </label>
                  <select
                    id="feature"
                    name="feature"
                    required
                    defaultValue=""
                    className="w-full appearance-none rounded-xl border border-cream-dark bg-cream px-4 py-3 text-night focus:border-emerald-deep focus:outline-none focus:ring-2 focus:ring-emerald-deep/20"
                  >
                    <option value="" disabled>
                      Choose a feature…
                    </option>
                    {featureOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-1 rounded-full bg-emerald-deep px-8 py-4 text-base font-bold text-cream shadow-lg shadow-emerald-deep/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-soft"
                >
                  Get Early Access
                </button>

                <p className="text-center text-xs text-ink-soft/70">
                  No spam, ever. One email when we launch — that&apos;s it.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
