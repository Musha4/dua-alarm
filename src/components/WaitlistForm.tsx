"use client";

import { useState, type FormEvent } from "react";

const featureOptions = [
  "Morning dua alarm",
  "Bedtime dua alarm",
  "Ayat al-Kursi",
  "Daily adhkar",
  "Family mode",
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
      submittedAt: new Date().toISOString(),
    };

    // For now we just log the signup locally.
    console.log("[Dua Alarm] Waitlist signup:", entry);

    // TODO: Connect a real backend. Two easy options:
    //
    // Option A — Supabase:
    //   1. `npm install @supabase/supabase-js`
    //   2. Create a `waitlist` table (name text, email text, feature text, created_at timestamptz).
    //   3. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.
    //   4. Replace the console.log above with:
    //        await supabase.from("waitlist").insert(entry);
    //
    // Option B — ConvertKit (email list):
    //   1. Create a form in ConvertKit and grab its form ID + API key.
    //   2. POST to https://api.convertkit.com/v3/forms/<FORM_ID>/subscribe
    //      with { api_key, email, first_name } — ideally from a Next.js
    //      route handler (src/app/api/waitlist/route.ts) so the key stays server-side.

    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="rounded-3xl border border-cream-dark bg-white/70 p-8 shadow-lg shadow-night/5 sm:p-10">
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
                JazakAllahu khayran — you&apos;re on the list!
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                We&apos;ll email you as soon as Dua Alarm is ready. In the
                meantime, keep us in your duas.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold">
                  Join the waitlist
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-night">
                  Be first to wake up with dua
                </h2>
                <p className="mt-3 text-ink-soft">
                  Early members get free access to Premium at launch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
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
                  className="mt-2 rounded-full bg-emerald-deep px-8 py-3.5 text-sm font-bold text-cream shadow-lg shadow-emerald-deep/25 transition-colors hover:bg-emerald-soft"
                >
                  Join the Waitlist
                </button>

                <p className="text-center text-xs text-ink-soft/70">
                  No spam, ever. Just one email when we launch.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
