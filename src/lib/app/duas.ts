// The MVP dua library. Mirrored in supabase/app-schema.sql (dua_library
// table) — the app reads from these constants so it works offline; the
// Supabase table exists so future versions can grow the library remotely.

export type Dua = {
  slug: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  durationSeconds: number;
  source: string;
  icon: string;
};

export const DUAS: Dua[] = [
  {
    slug: "morning",
    title: "Morning Dua",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah walhamdu lillah",
    translation:
      "We have entered the morning, and the dominion belongs to Allah, and all praise is for Allah.",
    durationSeconds: 20,
    source: "Hisn al-Muslim",
    icon: "🌅",
  },
  {
    slug: "bedtime",
    title: "Bedtime Dua",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    transliteration: "Allahumma bismika amutu wa ahya",
    translation: "O Allah, in Your name I die and I live.",
    durationSeconds: 15,
    source: "Sahih al-Bukhari",
    icon: "🌙",
  },
  {
    slug: "ayat-al-kursi",
    title: "Ayat al-Kursi",
    arabic:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ، لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration:
      "Allahu la ilaha illa huwal hayyul qayyum la takhudhuhu sinatun wala nawm",
    translation:
      "Allah — there is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. (opening)",
    durationSeconds: 60,
    source: "Al-Baqarah 2:255",
    icon: "📖",
  },
];

export function getDua(slug: string): Dua {
  return DUAS.find((d) => d.slug === slug) ?? DUAS[0];
}
