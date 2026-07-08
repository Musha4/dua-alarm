import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night">
      <div className="pattern-star absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-cream" />
            <span className="font-display text-lg font-semibold text-cream">
              Dua Alarm
            </span>
          </div>

          <p
            className="font-arabic text-2xl text-gold-light"
            lang="ar"
            dir="rtl"
          >
            وَاذْكُر رَّبَّكَ إِذَا نَسِيتَ
          </p>
          <p className="max-w-sm text-sm text-cream/60">
            “And remember your Lord when you forget.” — Surah al-Kahf 18:24
          </p>

          <nav className="flex gap-6 text-sm text-cream/70">
            <a href="#how-it-works" className="transition-colors hover:text-cream">
              How it works
            </a>
            <a href="#features" className="transition-colors hover:text-cream">
              Features
            </a>
            <a href="#waitlist" className="transition-colors hover:text-cream">
              Waitlist
            </a>
            <a href="#faq" className="transition-colors hover:text-cream">
              FAQ
            </a>
          </nav>

          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Dua Alarm. Made with love for the Ummah.
          </p>
        </div>
      </div>
    </footer>
  );
}
