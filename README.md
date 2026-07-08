# Dua Alarm — Validation Landing Page

A landing page to validate **Dua Alarm**: an Islamic habit alarm app where the
alarm encourages you to recite your morning or bedtime dua before completing it.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, mobile-first,
and ready to deploy on Vercel.

## What's on the page

| Section | Purpose |
| --- | --- |
| Hero + phone mockup | Pitch and product visual (6:30 AM alarm, Morning Dua, streak) |
| Problem | Why the habit is hard to keep |
| How it works | Set alarm → choose dua → recite to complete → build streak |
| Features | Morning/bedtime alarms, Arabic + transliteration + translation, streaks, upcoming adhkar & family mode |
| Pricing poll | "Would you pay $3.99/month for Premium?" (Yes / Maybe / No) |
| Waitlist form | Name, email, most-wanted feature |
| FAQ | Availability, platforms, free tier, dua choice, privacy |

The pricing poll and waitlist form currently **log responses to the browser
console** — see below to connect a real backend.

## Headline A/B test

Three hero headlines are being tested (defined in
[`src/lib/ab.ts`](src/lib/ab.ts)):

| Variant | Headline |
| --- | --- |
| `a` | Wake up with remembrance. |
| `b` | The alarm that helps you never miss your morning dua. |
| `c` | Build the habit of remembering Allah every morning. |

How it works:

- Each visitor is **randomly assigned** a variant on first visit; the
  assignment is stored in `localStorage` so it stays stable across visits.
- Every tracked event — `headline_viewed`, `cta_click`, `pricing_vote`,
  `waitlist_signup` — includes the visitor's `headlineVariant`, so you can
  compare signup conversion per headline.
- **Preview a specific variant** with `?v=a`, `?v=b`, or `?v=c` in the URL
  (e.g. `localhost:3000/?v=c`). This overrides the view without changing the
  visitor's stored assignment.
- To add/edit variants, change `HEADLINE_VARIANTS` in `src/lib/ab.ts`.

## Analytics

All events flow through [`src/lib/analytics.ts`](src/lib/analytics.ts) and are
forwarded to every active destination:

- **Browser console** — always on, so you can watch events in dev.
- **Vercel Analytics** — no tracking ID needed. Deploy on Vercel, then enable
  Analytics in the project dashboard. (Custom events need the paid tier; page
  views are free.)
- **Google Analytics** — set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `.env.local`
  (see `.env.local.example` for where to find the ID). The gtag scripts in
  `src/app/layout.tsx` only load when the ID is set.

Tracked events: `page_view`, `headline_viewed`, `waitlist_cta_click` (every
"Get Early Access" button, with its location), `feature_selected`,
`waitlist_signup`, `waitlist_duplicate`, `pricing_vote`,
`reserve_premium_click`, `faq_opened`, and `survey_submitted` — each carrying
the visitor's headline variant.

## Thank-you survey (/thank-you)

After a successful signup the visitor is redirected to `/thank-you`, which
asks three questions — beta tester? reserve Premium at $3.99/month? most
wanted feature? — and saves the answers to the `survey_responses` table in
Supabase, linked to the signup email. The table is created by the same
[`supabase/schema.sql`](supabase/schema.sql) file (safe to re-run if you set
up before it existed).

## Local setup

Requires Node.js 18.18+ (20+ recommended).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit files in
`src/components/` and the page hot-reloads.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Supabase setup (waitlist storage)

The waitlist form saves signups to a Supabase `waitlist` table
(id, name, email, preferred_feature, pricing_response, created_at),
with duplicate emails rejected case-insensitively at the database level.
One-time setup, ~5 minutes:

1. **Create a project** — free at [supabase.com](https://supabase.com).
2. **Create the table** — open **SQL Editor** in your project, paste the
   contents of [`supabase/schema.sql`](supabase/schema.sql), and click Run.
   This creates the table, the unique-email index, and Row Level Security
   policies (anonymous visitors can insert but never read the list).
3. **Add your keys** — copy `.env.local.example` to `.env.local` and fill in
   your Project URL and anon key (found under **Project Settings → API**).
4. **Restart** `npm run dev`.

Until you complete step 3, the form falls back to `console.log` (with a
`console.warn` reminder) so the page still works in development — but nothing
is saved.

How the pieces fit:

- [`src/lib/supabase.ts`](src/lib/supabase.ts) — the client (null until env vars are set)
- [`src/components/WaitlistForm.tsx`](src/components/WaitlistForm.tsx) — insert + loading / success / duplicate / error states
- [`src/components/PricingPoll.tsx`](src/components/PricingPoll.tsx) — stores the visitor's $3.99 vote locally; the form attaches it to their signup row as `pricing_response`
- View signups in the Supabase dashboard → **Table Editor → waitlist**

To also attribute signups to a headline variant, uncomment the
`headline_variant` column in `schema.sql` and the matching line in
`WaitlistForm.tsx`.

## Deploying to Vercel

### Option A — via GitHub (recommended)

1. Push this repo to GitHub:
   ```bash
   git remote add origin https://github.com/<you>/dua-alarm.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub, and
   **Import** the `dua-alarm` repository.
3. Vercel auto-detects Next.js — keep all defaults and click **Deploy**.
4. Done. Every push to `main` redeploys automatically. Add a custom domain
   under **Project → Settings → Domains** when ready.

### Option B — via CLI

```bash
npm install -g vercel
vercel          # first deploy (accept the defaults)
vercel --prod   # production deploy
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in
**Vercel → Project → Settings → Environment Variables** (same values as your
`.env.local`) and redeploy — otherwise the deployed form won't save signups.

## Project structure

```
src/
  app/
    layout.tsx        # fonts (Geist, Fraunces, Amiri) + metadata
    globals.css       # brand palette + geometric pattern
    page.tsx          # assembles all sections
  components/
    Header.tsx        # sticky nav
    Hero.tsx          # headline + CTAs
    PhoneMockup.tsx   # CSS-built phone screen
    Problem.tsx
    HowItWorks.tsx
    Features.tsx
    PricingPoll.tsx   # client component (poll state)
    WaitlistForm.tsx  # client component (form state)
    Faq.tsx
    Footer.tsx
```
