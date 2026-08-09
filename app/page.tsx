import Link from "next/link";
import Image from "next/image";
import { GAMES } from "@/lib/games";

const GAMVORA_LOGO = (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-label="GAMVORA" style={{ flexShrink: 0 }}>
    <defs>
      <linearGradient id="gv26" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c8ff2e" />
        <stop offset="1" stopColor="#7b5cff" />
      </linearGradient>
    </defs>
    <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv26)" strokeWidth="4.4" strokeLinecap="round" />
    <path d="M16.6 16H26.5" stroke="url(#gv26)" strokeWidth="4.4" strokeLinecap="round" />
  </svg>
);

const WHY_ITEMS = [
  { title: "Otomatis 24 jam", desc: "Sistem berjalan sepanjang hari, termasuk akhir pekan dan hari libur." },
  { title: "Tanpa password", desc: "Kami hanya memerlukan ID publik. Keamanan akun tetap terjaga." },
  { title: "Dukungan pelanggan", desc: "Waktu respons rata-rata di bawah 5 menit pada jam operasional." },
  { title: "Jaminan dana kembali", desc: "Bila pesanan tidak masuk dalam 1×24 jam, dana dikembalikan sepenuhnya." },
];

const FAQS = [
  { q: "Berapa lama pesanan diproses?", a: "Sebagian besar pesanan selesai dalam waktu kurang dari satu menit setelah pembayaran terkonfirmasi." },
  { q: "Apakah aman untuk akun saya?", a: "Aman. Kami hanya meminta ID akun yang bersifat publik, dan tidak pernah meminta password atau kode verifikasi." },
  { q: "Metode pembayaran apa saja yang tersedia?", a: "QRIS, e-wallet (DANA, OVO, GoPay), transfer bank, dan pulsa." },
  { q: "Bagaimana jika ID yang saya masukkan salah?", a: "Hubungi dukungan pelanggan sebelum pesanan diproses. Jika sudah terkirim ke ID lain, pesanan tidak dapat dibatalkan." },
];

export default function Home() {
  const topGames = GAMES.slice(0, 4);

  return (
    <>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", background: "rgba(10,10,12,.72)", borderBottom: "1px solid var(--color-line)" }}>
        <div className="wrap" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
            {GAMVORA_LOGO}
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: ".12em" }}>GAMVORA</span>
          </Link>
          <nav className="mut navlinks" style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14 }}>
            <Link href="/#katalog">Katalog</Link>
            <Link href="/#cara">Cara kerja</Link>
            <Link href="/#alasan">Kenapa kami</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <Link href="/#katalog" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>Top up</Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--color-line)" }}>
        <div className="hero-glow" />
        <div className="wrap hero-grid hero-sec" style={{ position: "relative", paddingTop: 76, paddingBottom: 76 }}>
          <div>
            <span className="pill"><span className="dot" />Sistem aktif 24 jam</span>
            <h1 className="h1" style={{ marginTop: 20, maxWidth: 520 }}>Top up game, tanpa ribet.</h1>
            <p className="mut" style={{ marginTop: 16, maxWidth: 440, fontSize: 16, lineHeight: 1.7 }}>
              Masukkan ID, pilih nominal, bayar. Saldo dikirim otomatis dari distributor resmi.
            </p>
            <div className="hero-cta" style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/#katalog" className="btn btn-primary">Pilih game</Link>
              <Link href="/#cara" className="btn btn-ghost">Cara kerja</Link>
            </div>
            <div className="mut hero-stats" style={{ marginTop: 32, display: "flex", gap: 26, flexWrap: "wrap", fontSize: 13 }}>
              <span><span style={{ color: "var(--color-paper)", fontWeight: 600 }} className="num">5</span> game</span>
              <span><span style={{ color: "var(--color-paper)", fontWeight: 600 }} className="num">~12 dtk</span> rata-rata proses</span>
              <span><span style={{ color: "var(--color-paper)", fontWeight: 600 }} className="num">99,9%</span> berhasil</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="eyebrow" style={{ color: "var(--color-grey)" }}>Paling sering di-top up</div>
            <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
              {topGames.map((g) => (
                <Link key={g.slug} href={`/top-up/${g.slug}`} className="qrow">
                  <span className="tile" style={{ width: 34, height: 34, padding: 5 }}>
                    <Image src={g.logo} alt={g.name} width={24} height={24} />
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{g.name}</span>
                  <span className="mut" style={{ marginLeft: "auto", fontSize: 13 }}>{g.cur}</span>
                </Link>
              ))}
            </div>
            <Link href="/#katalog" className="mut" style={{ display: "block", marginTop: 14, fontSize: 13 }}>Lihat semua game →</Link>
          </div>
        </div>
      </section>

      {/* KATALOG */}
      <section id="katalog" className="sec">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
            <div>
              <span className="eyebrow">Katalog</span>
              <h2 className="h2" style={{ marginTop: 12 }}>Pilih game</h2>
            </div>
            <p className="mut" style={{ maxWidth: 380, fontSize: 14, lineHeight: 1.6 }}>Seluruh transaksi diproses melalui distributor resmi dan dikirim langsung ke ID akun.</p>
          </div>

          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {GAMES.map((g) => (
              <Link key={g.slug} href={`/top-up/${g.slug}`} className="card gcard">
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="tile" style={{ width: 48, height: 48, padding: 7, flexShrink: 0 }}>
                    <Image src={g.logo} alt={g.name} width={34} height={34} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 550, fontSize: 15 }}>{g.name}</div>
                    <div className="mut" style={{ fontSize: 13, marginTop: 2 }}>{g.cur}</div>
                  </div>
                </div>
                <span className="gbtn">Top up</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* CARA KERJA */}
      <section id="cara" className="sec">
        <div className="wrap">
          <span className="eyebrow">Cara kerja</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Tiga langkah</h2>

          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            <div className="card" style={{ padding: 26 }}>
              <div className="num" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)" }}>01</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 16 }}>Masukkan ID akun</div>
              <p className="mut" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65 }}>Cukup User ID dan Server bila diminta. Kami tidak pernah meminta password atau akses login.</p>
            </div>
            <div className="card" style={{ padding: 26 }}>
              <div className="num" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-violet)" }}>02</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 16 }}>Pilih nominal &amp; bayar</div>
              <p className="mut" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65 }}>Tersedia QRIS, e-wallet, transfer bank, dan pulsa. Harga yang tertera sudah final.</p>
            </div>
            <div className="card" style={{ padding: 26 }}>
              <div className="num" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-hot)" }}>03</div>
              <div style={{ marginTop: 14, fontWeight: 600, fontSize: 16 }}>Saldo masuk otomatis</div>
              <p className="mut" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.65 }}>Pesanan diproses otomatis dan bukti transaksi dikirim ke email atau WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* ALASAN */}
      <section id="alasan" className="sec">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Kenapa GAMVORA</span>
              <h2 className="h2" style={{ marginTop: 12 }}>Kenapa pakai GAMVORA</h2>
              <p className="mut" style={{ marginTop: 20, fontSize: 15, lineHeight: 1.7, maxWidth: 420 }}>Setiap transaksi tercatat, seluruh nominal berasal dari sumber resmi, dan dana dikembalikan penuh apabila pesanan gagal diproses.</p>
            </div>
            <div style={{ display: "grid", gap: 1, background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: 14, overflow: "hidden" }}>
              {WHY_ITEMS.map((item) => (
                <div key={item.title} style={{ background: "var(--color-ink)", padding: "22px 24px" }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{item.title}</div>
                  <p className="mut" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="rule" />

      {/* FAQ */}
      <section id="faq" className="sec">
        <div className="wrap">
          <span className="eyebrow">FAQ</span>
          <h2 className="h2" style={{ marginTop: 12 }}>Pertanyaan umum</h2>

          <div style={{ marginTop: 36, maxWidth: 760 }}>
            {FAQS.map((f, i) => (
              <details key={i} style={{ borderTop: "1px solid var(--color-line)", padding: "20px 0", borderBottom: i === FAQS.length - 1 ? "1px solid var(--color-line)" : undefined }}>
                <summary style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 15, fontWeight: 500 }}>
                  {f.q}
                  <span className="chev">+</span>
                </summary>
                <p className="mut" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div style={{ border: "1px solid var(--color-line)", borderRadius: 18, padding: "56px 32px", textAlign: "center", background: "radial-gradient(600px 260px at 50% 0%, rgba(200,255,46,.10), transparent 70%), var(--color-panel)" }}>
            <h2 className="h2">Mulai top up sekarang</h2>
            <p className="mut" style={{ marginTop: 12, fontSize: 15 }}>Pilih game, selesai dalam hitungan detik.</p>
            <Link href="/#katalog" className="btn btn-primary" style={{ marginTop: 26 }}>Mulai top up</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--color-line)" }}>
        <div className="wrap" style={{ paddingTop: 56, paddingBottom: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <defs><linearGradient id="gv24" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#c8ff2e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs>
                <path d="M25.09 10.75A10.5 10.5 0 1 0 25.09 21.25" stroke="url(#gv24)" strokeWidth="4.4" strokeLinecap="round" />
                <path d="M16.6 16H26.5" stroke="url(#gv24)" strokeWidth="4.4" strokeLinecap="round" />
              </svg>
              <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: ".12em" }}>GAMVORA</span>
            </div>
            <p className="mut" style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Layanan top up game resmi dengan proses otomatis 24 jam dan harga transparan.</p>
          </div>
          <div>
            <div className="eyebrow">Katalog</div>
            <div style={{ marginTop: 14, display: "grid", gap: 10, fontSize: 14 }}>
              {GAMES.map((g) => (
                <Link key={g.slug} href={`/top-up/${g.slug}`} className="mut">{g.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Informasi</div>
            <div style={{ marginTop: 14, display: "grid", gap: 10, fontSize: 14 }}>
              <Link href="/#cara" className="mut">Cara kerja</Link>
              <Link href="/#alasan" className="mut">Kenapa kami</Link>
              <Link href="/#faq" className="mut">Pertanyaan umum</Link>
              <Link href="/#katalog" className="mut">Semua game</Link>
            </div>
          </div>
          <div>
            <div className="eyebrow">Bantuan</div>
            <div className="mut" style={{ marginTop: 14, display: "grid", gap: 10, fontSize: 14 }}>
              <span>Dukungan 24 jam</span>
              <a href="mailto:support@gamvora.net">support@gamvora.net</a>
              <span>Respons rata-rata &lt; 5 menit</span>
            </div>
            <div className="eyebrow" style={{ marginTop: 26 }}>Pembayaran</div>
            <div className="mut" style={{ marginTop: 12, fontSize: 13, lineHeight: 1.7 }}>QRIS · DANA · OVO · GoPay · Transfer bank</div>
          </div>
        </div>
        <div className="streak" />
        <div className="wrap mut" style={{ paddingTop: 20, paddingBottom: 32, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", fontSize: 12 }}>
          <span>© 2026 GAMVORA · gamvora.net</span>
          <span>Semua merek dan logo game adalah milik penerbit masing-masing.</span>
        </div>
      </footer>
    </>
  );
}
