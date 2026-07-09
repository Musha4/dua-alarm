// ============================================================
// Speech recognition + recitation matching
// ============================================================
// Uses the browser Web Speech API (Chrome/Edge/Safari — no key needed).
// Recognition runs in Arabic; progress is computed as word coverage of
// the dua, matched fuzzily against BOTH the Arabic text and the Latin
// transliteration (whichever the engine returns matches better).
// The alarm is considered "recited" at ≥ 80% coverage.

import type { Dua } from "./duas";

export const COMPLETION_THRESHOLD = 0.8;

/* ---------- minimal Web Speech API types ---------- */
type RecognitionResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>;
};
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as
    | (new () => Recognition)
    | null;
}

export function isSpeechSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export type SpeechSession = { stop: () => void };

/**
 * Starts continuous recognition. Chrome ends recognition after short
 * silences, so we automatically restart until stop() is called.
 */
export function startRecognition(
  onTranscript: (transcript: string) => void,
  onError: (message: string) => void,
): SpeechSession | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;

  let stopped = false;
  let finalText = "";
  const rec = new Ctor();
  rec.lang = "ar-SA"; // reciting in Arabic; engine may still return Latin
  rec.continuous = true;
  rec.interimResults = true;

  rec.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const chunk = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += " " + chunk;
      else interim += " " + chunk;
    }
    onTranscript((finalText + " " + interim).trim());
  };
  rec.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "service-not-allowed") {
      stopped = true;
      onError("Microphone access was blocked. Use the fallback below.");
    }
    // "no-speech" and "aborted" are routine — onend will restart.
  };
  rec.onend = () => {
    if (!stopped) {
      try {
        rec.start();
      } catch {
        // Already restarting — ignore.
      }
    }
  };

  try {
    rec.start();
  } catch {
    onError("Could not start the microphone.");
    return null;
  }

  return {
    stop() {
      stopped = true;
      try {
        rec.stop();
      } catch {
        // Already stopped.
      }
    },
  };
}

/* ---------- matching ---------- */

/** Strip harakat/diacritics and normalize letter variants. */
function normalizeArabic(text: string): string[] {
  return text
    .replace(/[ً-ْٰـ]/g, "") // harakat, dagger alif, tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^؀-ۿ\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeLatin(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const tmp = dp[i];
      dp[i] = Math.min(
        dp[i] + 1,
        dp[i - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      prev = tmp;
    }
  }
  return dp[a.length];
}

function wordsMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length >= 3 && (a.includes(b) || b.includes(a))) return true;
  const maxDist = Math.max(a.length, b.length) >= 6 ? 2 : 1;
  return levenshtein(a, b) <= maxDist;
}

/** Fraction of target words found (fuzzily) in the transcript. */
function coverage(targetWords: string[], spokenWords: string[]): number {
  if (targetWords.length === 0) return 0;
  const remaining = [...spokenWords];
  let matched = 0;
  for (const target of targetWords) {
    const i = remaining.findIndex((w) => wordsMatch(target, w));
    if (i !== -1) {
      matched++;
      remaining.splice(i, 1);
    }
  }
  return matched / targetWords.length;
}

/** Progress 0–1: how much of the dua has been recited so far. */
export function computeProgress(transcript: string, dua: Dua): number {
  const arabic = coverage(normalizeArabic(dua.arabic), normalizeArabic(transcript));
  const latin = coverage(
    normalizeLatin(dua.transliteration),
    normalizeLatin(transcript),
  );
  return Math.min(1, Math.max(arabic, latin));
}
