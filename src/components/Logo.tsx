export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      {/* Crescent */}
      <path
        d="M28.5 20a11.5 11.5 0 1 1-9.7-11.36 9.2 9.2 0 1 0 9.55 13.4A11.6 11.6 0 0 0 28.5 20Z"
        fill="currentColor"
      />
      {/* Star */}
      <path
        d="m29.5 12 1.2 3.05 3.05 1.2-3.05 1.2-1.2 3.05-1.2-3.05-3.05-1.2 3.05-1.2 1.2-3.05Z"
        fill="var(--color-gold)"
      />
    </svg>
  );
}
