// ============================================================
// Alarm sound — generated with WebAudio, no audio files needed
// ============================================================
// A gentle two-note chime that loops until stopAlarmSound() is called.
// Browsers block audio until the page has had a user gesture; if that
// happens, startAlarmSound() resolves "blocked" and the ring screen
// shows a "tap to enable sound" overlay whose tap retries.

let ctx: AudioContext | null = null;
let loop: ReturnType<typeof setInterval> | null = null;

function tone(freq: number, at: number, duration: number, peak: number) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + duration + 0.05);
}

function chime() {
  if (!ctx) return;
  const t = ctx.currentTime;
  tone(659.25, t, 0.9, 0.22); // E5
  tone(880.0, t + 0.35, 1.1, 0.2); // A5
}

export async function startAlarmSound(): Promise<"playing" | "blocked"> {
  if (loop) return "playing";
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return "blocked";
    }
  }
  if (ctx.state !== "running") return "blocked";
  chime();
  loop = setInterval(chime, 1900);
  return "playing";
}

export function stopAlarmSound() {
  if (loop) {
    clearInterval(loop);
    loop = null;
  }
}
