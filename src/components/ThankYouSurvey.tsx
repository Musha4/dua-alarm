"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/ab";
import { supabase, type SurveyResponse } from "@/lib/supabase";
import { SIGNUP_EMAIL_KEY } from "./WaitlistForm";

const featureOptions = [
  "Morning dua alarm",
  "Bedtime dua alarm",
  "Ayat al-Kursi",
  "Daily adhkar",
  "Family mode",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ThankYouSurvey() {
  // Set by WaitlistForm right before redirecting here — links the survey
  // answers to the visitor's waitlist row. Null if they came directly.
  const [email, setEmail] = useState<string | null>(null);

  const [betaTester, setBetaTester] = useState<boolean | null>(null);
  const [reservePremium, setReservePremium] = useState<boolean | null>(null);
  const [feature, setFeature] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setEmail(localStorage.getItem(SIGNUP_EMAIL_KEY));
  }, []);

  const allAnswered =
    betaTester !== null && reservePremium !== null && feature !== null;

  function handleReservePremium(answer: boolean) {
    setReservePremium(answer);
    if (answer) {
      // Strong buying signal — tracked as its own event.
      trackEvent("reserve_premium_click");
    }
  }

  async function handleSubmit() {
    if (!allAnswered || status === "submitting") return;

    const response: SurveyResponse = {
      email,
      beta_tester: betaTester,
      reserve_premium: reservePremium,
      preferred_feature: feature,
    };

    trackEvent("survey_submitted", { ...response });

    // Supabase not configured yet? Same dev fallback as the waitlist form —
    // logged to the console only (see setup checklist in src/lib/supabase.ts).
    if (!supabase) {
      console.warn(
        "[Dua Alarm] Supabase is NOT configured — this survey response was " +
          "logged to the console only and has NOT been saved.",
      );
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const { error } = await supabase.from("survey_responses").insert(response);

    if (error) {
      console.error("[Dua Alarm] Survey insert failed:", error);
      setStatus("error"); // answers stay selected — one tap to retry
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center sm:px-6 md:py-28" aria-live="polite">
        <p className="font-arabic text-3xl text-emerald-deep" lang="ar" dir="rtl">
          بَارَكَ اللهُ فِيكَ
        </p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-night sm:text-4xl">
          That&apos;s everything — thank you!
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
          Your answers directly shape what we build first. We&apos;ll email you
          the moment Dua Alarm is ready, insha&apos;Allah. Keep us in your duas.
        </p>
        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-emerald-deep px-8 py-3.5 text-sm font-bold text-cream shadow-lg shadow-emerald-deep/25 transition-colors hover:bg-emerald-soft"
        >
          Back to the site
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-6 md:py-20">
      <div className="text-center">
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
        <h1 className="mt-5 font-display text-3xl font-semibold text-night sm:text-4xl">
          JazakAllahu khayran — you&apos;re in!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          While you&apos;re here: three quick questions. Your answers decide
          what we build first.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {/* Question 1 — beta tester */}
        <fieldset>
          <legend className="font-display text-lg font-semibold text-night">
            1. Would you like to be a beta tester?
          </legend>
          <p className="mt-1 text-sm text-ink-soft">
            Beta testers get the app weeks early and talk directly with us.
          </p>
          <div className="mt-3 flex gap-3">
            <ChoiceButton
              selected={betaTester === true}
              onClick={() => setBetaTester(true)}
            >
              Yes, count me in
            </ChoiceButton>
            <ChoiceButton
              selected={betaTester === false}
              onClick={() => setBetaTester(false)}
            >
              No thanks
            </ChoiceButton>
          </div>
        </fieldset>

        {/* Question 2 — reserve premium */}
        <fieldset>
          <legend className="font-display text-lg font-semibold text-night">
            2. Would you reserve Premium at $3.99/month?
          </legend>
          <p className="mt-1 text-sm text-ink-soft">
            No payment now — reserving just tells us you&apos;re serious, and
            locks in founding-member pricing forever.
          </p>
          <div className="mt-3 flex gap-3">
            <ChoiceButton
              selected={reservePremium === true}
              onClick={() => handleReservePremium(true)}
            >
              Yes, reserve my spot
            </ChoiceButton>
            <ChoiceButton
              selected={reservePremium === false}
              onClick={() => handleReservePremium(false)}
            >
              Not right now
            </ChoiceButton>
          </div>
        </fieldset>

        {/* Question 3 — most wanted feature */}
        <fieldset>
          <legend className="font-display text-lg font-semibold text-night">
            3. What feature do you want most?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {featureOptions.map((option) => (
              <ChoiceButton
                key={option}
                selected={feature === option}
                onClick={() => setFeature(option)}
              >
                {option}
              </ChoiceButton>
            ))}
          </div>
        </fieldset>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered || status === "submitting"}
            className="w-full rounded-full bg-emerald-deep px-8 py-4 text-base font-bold text-cream shadow-lg shadow-emerald-deep/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {status === "submitting" ? "Saving…" : "Send my answers"}
          </button>

          {!allAnswered && (
            <p className="mt-2.5 text-center text-xs text-ink-soft/70">
              Answer all three questions to send.
            </p>
          )}

          {status === "error" && (
            <p
              role="alert"
              className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800 ring-1 ring-red-200"
            >
              Something went wrong saving your answers — please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        selected
          ? "bg-emerald-deep text-cream shadow-md shadow-emerald-deep/25"
          : "bg-white/70 text-night ring-1 ring-cream-dark hover:bg-cream-dark/40"
      }`}
    >
      {children}
    </button>
  );
}
