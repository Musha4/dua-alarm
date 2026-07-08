-- ============================================================
-- Dua Alarm — waitlist table
-- ============================================================
-- HOW TO RUN THIS:
--   1. Go to https://supabase.com and create a free project
--      (any name, e.g. "dua-alarm"; pick a region near your users).
--   2. In your project, open "SQL Editor" in the left sidebar.
--   3. Paste this entire file and click "Run".
--   4. Done — the table, duplicate protection, and security
--      policies below are all created in one go.
-- ============================================================

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  preferred_feature text not null,
  -- The visitor's answer to the $3.99/month question ("yes" | "maybe" | "no").
  -- Captured at signup time if they voted in the pricing poll; null otherwise.
  pricing_response text,
  created_at timestamptz not null default now()

  -- OPTIONAL: to attribute signups to a hero headline (A/B test),
  -- uncomment this column and the matching line in WaitlistForm.tsx:
  -- , headline_variant text
);

-- Prevent duplicate emails, case-insensitively:
-- "Zair@Gmail.com" and "zair@gmail.com" count as the same address.
-- (The form also lowercases emails before inserting; this index is the
-- database-level guarantee.)
create unique index if not exists waitlist_email_unique
  on public.waitlist (lower(email));

-- ============================================================
-- Row Level Security
-- ============================================================
-- The landing page uses the *anon* (public) API key, so RLS decides
-- what anonymous visitors are allowed to do:
--   - INSERT: allowed  (anyone can join the waitlist)
--   - SELECT/UPDATE/DELETE: no policy = denied
--     (nobody can read the email list through the public API;
--      you view signups in the Supabase dashboard → Table Editor)

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
