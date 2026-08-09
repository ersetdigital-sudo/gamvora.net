import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getGame } from "@/lib/games";
import { GameOrderForm } from "@/components/GameOrderForm";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function rp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game tidak ditemukan" };
  return {
    title: `Top Up ${game.name} Murah & Instan — GAMVORA`,
    description: `Top up ${game.cur.toLowerCase()} ${game.name} di GAMVORA. Proses otomatis 24 jam, tanpa login akun, pembayaran QRIS.`,
  };
}

const GAMVORA_LOGO = (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="gv-h" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#c8ff2e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
    <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv-h)" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16.6 16H26.5" stroke="url(#gv-h)" strokeWidth="4.4" strokeLinecap="round" />
  </svg>
);

export default async function TopUpPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  let qrisUrl = "";
  try {
    const supabase = await createSupabaseServerClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from("settings") as any)
      .select("value").eq("key", "qris_image_url").single();
    if (data?.value) qrisUrl = String(data.value);
  } catch {}

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Game", href: "/#katalog" },
    { label: game.name },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/80 border-b border-line">
        <div className="max-w-5xl mx-auto px-5 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {GAMVORA_LOGO}
            <span className="font-semibold tracking-[.12em] text-sm sm:text-base">GAMVORA</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-grey">
            <Link href="/" className="hover:text-paper transition">Home</Link>
            <Link href="/#katalog" className="hover:text-paper transition">Game</Link>
          </nav>
          <Link href="/" className="btn-ghost px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">← Semua game</Link>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-line" style={{ background: "radial-gradient(680px 380px at 20% 0%, rgba(123,92,255,.12), transparent 65%), var(--color-ink)" }}>
          <div className="max-w-5xl mx-auto px-5 py-10 md:py-14">
            {/* Breadcrumb */}
            <nav className="text-xs text-grey mb-6">
              {crumbs.map((c, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-2">/</span>}
                  {c.href ? <Link href={c.href} className="hover:text-paper transition">{c.label}</Link> : <span className="text-paper">{c.label}</span>}
                </span>
              ))}
            </nav>

            {/* Game Info */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <div className="logo-tile w-20 h-20 sm:w-24 sm:h-24 p-3 shrink-0">
                <img src={game.logo} alt={game.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="tag mono">resmi</span>
                <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                  {game.name}
                </h1>
                <p className="mt-2 text-grey max-w-lg">{game.copy}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-grey">
              <span className="flex items-center gap-2"><span className="text-accent">✓</span> Proses otomatis 24 jam</span>
              <span className="flex items-center gap-2"><span className="text-accent">✓</span> QRIS & e-wallet</span>
              <span className="flex items-center gap-2"><span className="text-accent">✓</span> Garansi uang kembali</span>
            </div>
          </div>
        </section>

        {/* ORDER SECTION */}
        <section className="max-w-5xl mx-auto px-5 py-10 md:py-14">
          <GameOrderForm game={game} qrisUrl={qrisUrl} />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line">
        <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-grey">
          <div className="flex items-center gap-2">
            {GAMVORA_LOGO}
            <span>© 2026 GAMVORA</span>
          </div>
          <span>Semua merek dan logo game adalah milik penerbit masing-masing.</span>
        </div>
      </footer>
    </>
  );
}
