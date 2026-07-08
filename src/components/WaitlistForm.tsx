"use client";

import { useState, type FormEvent } from "react";
import { getHeadlineVariant, trackEvent } from "@/lib/ab";
import { supabase, PG_UNIQUE_VIOLATION, type WaitlistEntry } from "@/lib/supabase";
import { PRICING_VOTE_KEY } from "./PricingPoll";

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

type Status =
  | "idle" // form showing, nothing submitted yet
  | "submitting" // insert in flight — button disabled
  | "success" // saved to Supabase (or dev fallback)
  | "duplicate" // email already on the list — friendly, not an error
  | "error"; // something went wrong — form stays filled for retry

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);

    // Normalize the email so "Zair@Gmail.com" and "zair@gmail.com" are the
    // same person — pairs with the unique lower(email) index in schema.sql.
    const email = String(formData.get("email")).trim().toLowerCase();

    const entry: WaitlistEntry = {
      name: String(formData.get("name")).trim(),
      email,
      preferred_feature: String(formData.get("feature")),
      // Their $3.99/month poll answer, if they voted (null otherwise).
      pricing_response: localStorage.getItem(PRICING_VOTE_KEY),
      // headline_variant: getHeadlineVariant(), // uncomment along with the
      //                                         // column in supabase/schema.sql
    };

    // Supabase not configured yet? (missing .env.local — see src/lib/supabase.ts)
    // Fall back to console logging so the page still works in development.
    if (!supabase) {
      console.warn(
        "[Dua Alarm] Supabase is NOT configured — this signup was logged " +
          "to the console only and has NOT been saved. Follow the setup " +
          "checklist in src/lib/supabase.ts.",
      );
      trackEvent("waitlist_signup", { ...entry, savedTo: "console-only" });
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const { error } = await supabase.from("waitlist").insert(entry);

    if (!error) {
      trackEvent("waitlist_signup", {
        email,
        headlineVariant: getHeadlineVariant(),
      });
      setStatus("success");
      return;
    }

    // Duplicate email — the unique index rejected the insert. They're
    // already on the list, so treat it as good news, not a failure.
    if (error.code === PG_UNIQUE_VIOLATION) {
      trackEvent("waitlist_duplicate", { email });
      setStatus("duplicate");
      return;
    }

    // Anything else: network issue, RLS misconfiguration, etc.
    // Keep the form filled so they can simply press the button again.
    console.error("[Dua Alarm] Waitlist insert failed:", error);
    setErrorMessage(
      "Something went wrong on our end — please try again in a moment.",
    );
    setStatus("error");
  }

  const isDone = status === "success" || status === "duplicate";

  return (
    <section id="waitlist" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-xl px-5 sm:px-6">
        <div className="rounded-3xl border border-cream-dark bg-white/70 p-7 shadow-lg shadow-night/5 sm:p-10">
          {isDone ? (
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
              {status === "success" ? (
                <>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-night">
                    JazakAllahu khayran — you&apos;re in!
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    You&apos;re on the founding list. We&apos;ll email you the
                    moment Dua Alarm is ready — and your free Premium will be
                    waiting. Keep us in your duas.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-night">
                    You&apos;re already on the list!
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">
                    This email is already signed up — no need to do anything
                    else. We&apos;ll be in touch the moment Dua Alarm is ready,
                    insha&apos;Allah.
                  </p>
                </>
              )}
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
                  disabled={status === "submitting"}
                  className="mt-1 rounded-full bg-emerald-deep px-8 py-4 text-base font-bold text-cream shadow-lg shadow-emerald-deep/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-soft disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? "Joining…" : "Get Early Access"}
                </button>

                {status === "error" && errorMessage && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800 ring-1 ring-red-200"
                  >
                    {errorMessage}
                  </p>
                )}

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
