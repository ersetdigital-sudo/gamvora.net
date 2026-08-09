import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    title: `Top Up ${game.name} ${game.cur} — GAMVORA`,
    description: `Top up ${game.cur.toLowerCase()} ${game.name} di GAMVORA. Cukup User ID${game.server ? " + Server" : ""}, proses otomatis, harga jujur.`,
  };
}

const GAMVORA_LOGO_SVG = (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="gv26t" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#c8ff2e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
    <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv26t)" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16.6 16H26.5" stroke="url(#gv26t)" strokeWidth="4.4" strokeLinecap="round" />
  </svg>
);

const FOOTER_LOGO = (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <defs><linearGradient id="gv24f" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#c8ff2e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
    <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv24f)" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16.6 16H26.5" stroke="url(#gv24f)" strokeWidth="4.4" strokeLinecap="round" />
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

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur bg-ink/80 border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            {GAMVORA_LOGO_SVG}
            <span className="text-lg font-semibold" style={{ letterSpacing: ".12em" }}>GAMVORA</span>
          </Link>
          <Link href="/" className="btn-ghost px-5 py-2 text-sm">← Semua game</Link>
        </div>
      </header>

      {/* GAME INFO */}
      <section className="grid-bg border-b border-line">
        <div className="max-w-6xl mx-auto px-5 py-10 md:py-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          <div className="logo-tile w-16 h-16 sm:w-24 sm:h-24 p-2 sm:p-3 shrink-0">
            <Image src={game.logo} alt={game.name} width={80} height={80} className="object-contain w-full h-full" />
          </div>
          <div>
            <span className="tag mono">resmi</span>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">{game.name}</h1>
            <p className="mt-2 text-grey">{game.copy}</p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-5 py-10 md:py-14 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <GameOrderForm game={game} qrisUrl={qrisUrl} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line bg-ink">
        <div className="max-w-6xl mx-auto px-5 py-12 pb-28 lg:pb-12 grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              {FOOTER_LOGO}
              <span className="text-base font-semibold text-white" style={{ letterSpacing: ".12em" }}>GAMVORA</span>
            </div>
            <p className="mt-4 text-sm text-grey leading-relaxed">Top up game favorit jadi lebih simpel bersama GAMVORA.</p>
            <div className="mt-5 flex gap-2">
              <span className="tag mono text-[10px]">ONLINE 24 JAM</span>
              <span className="tag mono text-[10px]">RESMI</span>
            </div>
          </div>
          <div>
            <div className="mono text-xs text-accent tracking-widest">KATALOG</div>
            <ul className="mt-4 space-y-2.5 text-sm text-grey">
              <li><Link href="/top-up/mobile-legends" className="hover:text-accent">Mobile Legends</Link></li>
              <li><Link href="/top-up/free-fire" className="hover:text-accent">Free Fire</Link></li>
              <li><Link href="/top-up/pubg-mobile" className="hover:text-accent">PUBG Mobile</Link></li>
              <li><Link href="/top-up/call-of-duty-mobile" className="hover:text-accent">Call of Duty: Mobile</Link></li>
              <li><Link href="/top-up/magic-chess-go-go" className="hover:text-accent">Magic Chess: Go Go</Link></li>
            </ul>
          </div>
          <div>
            <div className="mono text-xs text-accent tracking-widest">INFORMASI</div>
            <ul className="mt-4 space-y-2.5 text-sm text-grey">
              <li><Link href="/#cara" className="hover:text-accent">Cara Pemesanan</Link></li>
              <li><Link href="/#alasan" className="hover:text-accent">Kenapa GAMVORA</Link></li>
              <li><Link href="/#faq" className="hover:text-accent">Pertanyaan Umum</Link></li>
              <li><Link href="/#katalog" className="hover:text-accent">Semua Game</Link></li>
            </ul>
          </div>
          <div>
            <div className="mono text-xs text-accent tracking-widest">BANTUAN</div>
            <ul className="mt-4 space-y-2.5 text-sm text-grey">
              <li>Dukungan pelanggan 24 jam</li>
              <li><a href="mailto:support@gamvora.net" className="hover:text-accent">support@gamvora.net</a></li>
              <li>Respons rata-rata &lt; 5 menit</li>
            </ul>
            <div className="mono text-xs text-accent tracking-widest mt-7">PEMBAYARAN</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-grey">
              <span className="tag mono">QRIS</span><span className="tag mono">DANA</span><span className="tag mono">OVO</span><span className="tag mono">GOPAY</span><span className="tag mono">BANK</span>
            </div>
          </div>
        </div>
        <div className="streak" />
        <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-grey mono">
          <div>© 2026 GAMVORA · gamvora.net</div>
          <div>Semua merek dan logo game adalah milik penerbit masing-masing.</div>
        </div>
      </footer>
    </>
  );
}
