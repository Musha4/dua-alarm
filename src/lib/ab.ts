// Lightweight client-side A/B test for the hero headline.
//
// How it works:
//  - Each visitor is randomly assigned a variant on first visit.
//  - The assignment is stored in localStorage so it stays stable across visits.
//  - Every tracked event (waitlist signup, pricing vote, CTA click) includes
//    the visitor's variant, so you can compare conversion per headline.
//  - Preview a specific variant with ?v=a, ?v=b, or ?v=c in the URL
//    (overrides for that page view without changing the stored assignment).

export const HEADLINE_VARIANTS = {
  a: {
    pre: "Wake up with ",
    highlight: "remembrance.",
    post: "",
  },
  b: {
    pre: "The alarm that helps you ",
    highlight: "never miss",
    post: " your morning dua.",
  },
  c: {
    pre: "Build the habit of ",
    highlight: "remembering Allah",
    post: " every morning.",
  },
} as const;

export type HeadlineVariant = keyof typeof HEADLINE_VARIANTS;

const VARIANT_IDS = Object.keys(HEADLINE_VARIANTS) as HeadlineVariant[];
const STORAGE_KEY = "dua-alarm.headline-variant";

function isVariant(value: string | null): value is HeadlineVariant {
  return value !== null && (VARIANT_IDS as string[]).includes(value);
}

/** Returns the visitor's headline variant. Client-side only. */
export function getHeadlineVariant(): HeadlineVariant {
  // 1. URL override for previewing a specific variant: ?v=a|b|c
  const override = new URLSearchParams(window.location.search).get("v");
  if (isVariant(override)) return override;

  // 2. Sticky assignment from a previous visit
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isVariant(stored)) return stored;

  // 3. First visit: assign randomly and persist
  const assigned = VARIANT_IDS[Math.floor(Math.random() * VARIANT_IDS.length)];
  localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}

/**
 * Central event tracker. Every event automatically carries the visitor's
 * headline variant so conversions can be attributed to a headline.
 *
 * For now events go to the browser console. To measure for real, forward
 * the payload to your analytics tool of choice, e.g.:
 *   - Plausible:  window.plausible(event, { props: payload })
 *   - PostHog:    posthog.capture(event, payload)
 *   - Supabase:   await supabase.from("events").insert(payload)
 */
export function trackEvent(
  event: string,
  props: Record<string, unknown> = {},
) {
  const payload = {
    event,
    headlineVariant: getHeadlineVariant(),
    ...props,
    at: new Date().toISOString(),
  };
  console.log(`[Dua Alarm] ${event}`, payload);
}
