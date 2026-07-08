import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ============================================================
// Supabase client
// ============================================================
// SETUP CHECKLIST (one-time, ~5 minutes):
//   1. Create a free project at https://supabase.com
//   2. Run supabase/schema.sql in the project's SQL Editor
//      (creates the `waitlist` table + duplicate-email protection
//       + insert-only security policies)
//   3. Copy .env.local.example to .env.local and fill in your
//      Project URL and anon key (instructions inside that file)
//   4. Restart `npm run dev`
//
// Until step 3 is done, `supabase` below is null and the waitlist
// form falls back to console.log so the page still works in dev —
// but nothing is saved. A console.warn will remind you.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/** Shape of a row in the `waitlist` table (see supabase/schema.sql). */
export type WaitlistEntry = {
  name: string;
  email: string;
  preferred_feature: string;
  pricing_response: string | null;
  // headline_variant: string; // uncomment along with the column in schema.sql
};

/** Shape of a row in the `survey_responses` table (see supabase/schema.sql). */
export type SurveyResponse = {
  email: string | null;
  beta_tester: boolean;
  reserve_premium: boolean;
  preferred_feature: string;
};

/** Postgres error code for a unique-constraint violation (duplicate email). */
export const PG_UNIQUE_VIOLATION = "23505";
