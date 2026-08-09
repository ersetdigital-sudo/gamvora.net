export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 6px 18px rgba(200,255,46,.35))" }}
    >
      <defs>
        <linearGradient id="gv-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c8ff2e" />
          <stop offset="1" stopColor="#7b5cff" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="13" fill="none" stroke="url(#gv-grad)" strokeWidth="2" />
      <path d="M37.6 16.1A15.8 15.8 0 1 0 37.6 31.9" stroke="url(#gv-grad)" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M24.9 24H39.8" stroke="url(#gv-grad)" strokeWidth="4.4" strokeLinecap="round" />
    </svg>
  );
}
