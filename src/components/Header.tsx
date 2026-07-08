import Logo from "./Logo";
import TrackedLink from "./TrackedLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8 text-emerald-deep" />
          <span className="font-display text-lg font-semibold tracking-tight text-night">
            Dua Alarm
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="/#how-it-works" className="transition-colors hover:text-night">
            How it works
          </a>
          <a href="/#features" className="transition-colors hover:text-night">
            Features
          </a>
          <a href="/#faq" className="transition-colors hover:text-night">
            FAQ
          </a>
        </nav>

        <TrackedLink
          href="/#waitlist"
          event="waitlist_cta_click"
          eventProps={{ location: "header" }}
          className="rounded-full bg-emerald-deep px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-emerald-soft"
        >
          Get Early Access
        </TrackedLink>
      </div>
    </header>
  );
}
