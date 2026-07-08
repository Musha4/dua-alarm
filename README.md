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

## Connecting real data collection

Right now, submissions are logged with `console.log` so you can test the flow.
The integration points are marked with `TODO` comments in:

- [`src/components/WaitlistForm.tsx`](src/components/WaitlistForm.tsx) — waitlist signups (Supabase or ConvertKit instructions inline)
- [`src/components/PricingPoll.tsx`](src/components/PricingPoll.tsx) — pricing poll votes

**Supabase (quick version):** create a project, add a `waitlist` table, put
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`,
`npm install @supabase/supabase-js`, and replace the `console.log` with an
`insert` call.

**ConvertKit:** create a form, then POST subscribers to the ConvertKit API from
a route handler (`src/app/api/waitlist/route.ts`) so your API key stays
server-side.

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

If you later add Supabase/ConvertKit keys, set them in
**Vercel → Project → Settings → Environment Variables** and redeploy.

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
