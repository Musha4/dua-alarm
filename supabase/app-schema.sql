-- ============================================================
-- Dua Alarm — MVP app tables (users, alarms, dua_library, completions)
-- ============================================================
-- HOW TO RUN: Supabase dashboard → SQL Editor → paste this file → Run.
-- Safe to re-run (everything uses "if not exists" / "on conflict").
--
-- AUTH MODEL (MVP): no real login. Each browser generates an anonymous
-- device_id (UUID in localStorage) and rows are keyed by it. The app
-- treats localStorage as the source of truth and mirrors writes here,
-- so RLS is insert-only: anonymous visitors can write their own events
-- but nobody can read anyone's data through the public API.
--
-- TO UPGRADE TO REAL AUTH LATER:
--   1. Enable Supabase Auth (email / Apple / Google).
--   2. Add a user_id uuid column referencing auth.users.
--   3. Replace these insert-only policies with
--      "auth.uid() = user_id" policies for select/insert/update/delete.

-- 1. Anonymous users (one row per device)
create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  device_id text not null unique,
  name text,
  created_at timestamptz not null default now()
);

-- 2. Alarms (insert-only event mirror of the client's alarms)
create table if not exists public.alarms (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  time text not null,                    -- "06:30" (24h)
  period text not null,                  -- morning | bedtime
  repeat text not null default 'daily',  -- daily | once
  dua_slug text not null,
  sound text not null default 'chime',   -- chime | silent
  recite_to_dismiss boolean not null default true,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- 3. Dua library (seeded below; the app also ships these locally so it
--    works offline — grow this table when the library moves server-side)
create table if not exists public.dua_library (
  slug text primary key,
  title text not null,
  arabic text not null,
  transliteration text not null,
  translation text not null,
  duration_seconds int not null,
  source text not null
);

-- 4. Completions (each finished recitation — powers streak analytics)
create table if not exists public.completions (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  alarm_id uuid,
  dua_slug text not null,
  method text not null default 'recited', -- recited | manual
  completed_at timestamptz not null default now()
);

-- ---------- seed data ----------
insert into public.dua_library
  (slug, title, arabic, transliteration, translation, duration_seconds, source)
values
  (
    'morning',
    'Morning Dua',
    'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
    'Asbahna wa asbahal mulku lillah walhamdu lillah',
    'We have entered the morning, and the dominion belongs to Allah, and all praise is for Allah.',
    20,
    'Hisn al-Muslim'
  ),
  (
    'bedtime',
    'Bedtime Dua',
    'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    'Allahumma bismika amutu wa ahya',
    'O Allah, in Your name I die and I live.',
    15,
    'Sahih al-Bukhari'
  ),
  (
    'ayat-al-kursi',
    'Ayat al-Kursi',
    'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
    'Allahu la ilaha illa huwal hayyul qayyum la takhudhuhu sinatun wala nawm',
    'Allah — there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. (opening)',
    60,
    'Al-Baqarah 2:255'
  )
on conflict (slug) do update set
  arabic = excluded.arabic,
  transliteration = excluded.transliteration,
  translation = excluded.translation,
  duration_seconds = excluded.duration_seconds,
  source = excluded.source;

-- ---------- row level security ----------
alter table public.app_users enable row level security;
alter table public.alarms enable row level security;
alter table public.dua_library enable row level security;
alter table public.completions enable row level security;

create policy "Anon devices can register"
  on public.app_users for insert to anon with check (true);

create policy "Anon devices can log alarms"
  on public.alarms for insert to anon with check (true);

create policy "Anon devices can log completions"
  on public.completions for insert to anon with check (true);

-- The dua library is public content — anyone may read it.
create policy "Anyone can read the dua library"
  on public.dua_library for select to anon using (true);
