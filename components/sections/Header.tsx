"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const GAMVORA_LOGO = (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="gv-h" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#c8ff2e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
    <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv-h)" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16.6 16H26.5" stroke="url(#gv-h)" strokeWidth="4.4" strokeLinecap="round" />
  </svg>
);

const NAV = [
  { href: "/#katalog", label: "Katalog" },
  { href: "/#cara", label: "Cara kerja" },
  { href: "/#alasan", label: "Kenapa kami" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/80 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 md:px-5 h-14 md:h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {GAMVORA_LOGO}
          <span className="font-semibold tracking-[.12em] text-sm md:text-base">GAMVORA</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-grey">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-paper transition">{item.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/#katalog" className="btn-acid text-[12px] md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition whitespace-nowrap">Top up</Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="md:hidden w-9 h-9 rounded-lg border border-line flex items-center justify-center text-grey hover:text-paper transition"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-line bg-panel/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-3 text-sm text-grey hover:text-paper transition rounded-lg px-2">{item.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
