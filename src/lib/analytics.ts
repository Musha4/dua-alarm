import { track as vercelTrack } from "@vercel/analytics";

// ============================================================
// Analytics — one function, three destinations
// ============================================================
// Every event on the page flows through sendToAnalytics() below and is
// forwarded to whichever tools are active:
//
//   1. Browser console — always on, so you can watch events in dev.
//
//   2. Vercel Analytics — NO tracking ID needed. It activates
//      automatically when the site is deployed on Vercel:
//        - Deploy the site, then open your Vercel project dashboard
//        - Go to the "Analytics" tab and click "Enable"
//      Custom events (the ones below) require the Analytics "Plus"
//      add-on or a Pro plan; page views work on the free tier.
//
//   3. Google Analytics — needs your Measurement ID:
//        - Create a GA4 property at https://analytics.google.com
//        - Copy its Measurement ID (looks like "G-XXXXXXXXXX")
//        - ADD YOUR TRACKING ID to .env.local (and Vercel env vars):
//            NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
//        - Restart the dev server / redeploy
//      The GA <script> tags are injected in src/app/layout.tsx only
//      when NEXT_PUBLIC_GA_ID is set — no ID, no GA code shipped.
//
// EVENTS TRACKED SITE-WIDE:
//   page_view            — every visit (also auto-tracked by both tools)
//   headline_viewed      — which A/B headline the visitor saw
//   waitlist_cta_click   — any "Join the Waitlist / Get Early Access" button
//                          (props.location says which one)
//   cta_click            — secondary CTAs (e.g. "See How It Works")
//   feature_selected     — dropdown choice in the waitlist form
//   waitlist_signup      — form submitted successfully
//   waitlist_duplicate   — email was already on the list
//   pricing_vote         — $3.99/month poll answer
//   reserve_premium_click— "reserve Premium" chosen on /thank-you
//   faq_opened           — an FAQ item expanded (props.question)
//   survey_submitted     — /thank-you survey saved

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA and Vercel only accept flat, primitive props — strip anything else. */
function primitiveProps(
  payload: Record<string, unknown>,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      out[key] = value;
    }
  }
  return out;
}

export function sendToAnalytics(
  event: string,
  payload: Record<string, unknown>,
) {
  // 1. Console — always, so events are visible in development
  console.log(`[Dua Alarm] ${event}`, payload);

  const props = primitiveProps(payload);

  // 2. Vercel Analytics (no-op locally, active once deployed on Vercel)
  try {
    vercelTrack(event, props);
  } catch {
    // Vercel Analytics not available — fine, other destinations still fire.
  }

  // 3. Google Analytics — only fires if NEXT_PUBLIC_GA_ID is configured
  //    (which injects gtag.js via src/app/layout.tsx)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, props);
  }
}
