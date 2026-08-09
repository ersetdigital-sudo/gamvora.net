"use client";

import { useState } from "react";
import { rupiah } from "@/lib/format";
import { CheckoutOverlay } from "@/components/CheckoutOverlay";
import type { Game } from "@/lib/games";

interface GameOrderFormProps {
  game: Game;
  qrisUrl: string;
}

export function GameOrderForm({ game, qrisUrl }: GameOrderFormProps) {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderId, setOrderId] = useState("");

  const nominals = game.nominals || [];
  const selected = selectedNominal !== null ? nominals[selectedNominal] : null;

  const handleCheckout = () => {
    if (!userId.trim() || userId.length < 4) return;
    if (game.server && !serverId.trim()) return;
    if (!selected) return;
    setOrderId("GV" + Date.now().toString().slice(-8));
    setShowCheckout(true);
  };

  return (
    <>
      {/* MOBILE LAYOUT */}
      <div className="lg:hidden space-y-4">
        {/* Game Info Card */}
        <div className="card p-5">
          <div className="flex items-center gap-4">
            <div className="logo-tile w-14 h-14 p-2 shrink-0">
              <img src={game.logo} alt={game.name} className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold truncate">{game.name}</h1>
              <p className="text-sm text-grey mt-0.5">{game.cur}</p>
            </div>
          </div>
        </div>

        {/* Account Input */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-3">
            <span className="text-accent mr-1">01</span> Masukkan akun
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-grey">{game.user_id_label || "User ID"}</label>
              <input
                type="text"
                inputMode="numeric"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={game.user_id_placeholder || "12345678"}
                className="mt-1 w-full rounded-xl bg-raise border border-line px-4 py-3 text-sm outline-none focus:border-accent text-paper placeholder:text-grey/50"
              />
            </div>
            {game.server && (
              <div>
                <label className="text-xs text-grey">{game.serverLabel || "Server ID"}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                  placeholder="2201"
                  className="mt-1 w-full rounded-xl bg-raise border border-line px-4 py-3 text-sm outline-none focus:border-accent text-paper placeholder:text-grey/50"
                />
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-grey">{game.hint}</p>
        </div>

        {/* Nominal Selection */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-3">
            <span className="text-accent mr-1">02</span> Pilih nominal
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {nominals.map((n, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedNominal(i)}
                className={`p-3 rounded-xl border text-left transition ${
                  selectedNominal === i
                    ? "border-accent bg-accent/10"
                    : "border-line bg-raise hover:border-grey"
                }`}
              >
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-accent mt-0.5 mono">{rupiah(n.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-3">
            <span className="text-accent mr-1">03</span> Pembayaran
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl border border-line text-center text-grey">QRIS</div>
            <div className="p-3 rounded-xl border border-line text-center text-grey">E-Wallet</div>
            <div className="p-3 rounded-xl border border-line text-center text-grey">Transfer Bank</div>
            <div className="p-3 rounded-xl border border-line text-center text-grey">Pulsa</div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {/* Account */}
          <div>
            <h2 className="text-xl font-semibold"><span className="mono text-accent">01.</span> Masukkan akun</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-grey">{game.user_id_label || "User ID"}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={game.user_id_placeholder || "contoh: 12345678"}
                  className="mt-1 w-full rounded-xl bg-raise border border-line px-4 py-3 text-sm outline-none focus:border-paper text-paper placeholder:text-grey/50"
                />
              </div>
              {game.server && (
                <div>
                  <label className="text-xs text-grey">{game.serverLabel || "Server ID"}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value)}
                    placeholder="contoh: 2201"
                    className="mt-1 w-full rounded-xl bg-raise border border-line px-4 py-3 text-sm outline-none focus:border-paper text-paper placeholder:text-grey/50"
                  />
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-grey">{game.hint}</p>
          </div>

          {/* Nominal */}
          <div>
            <h2 className="text-xl font-semibold"><span className="mono text-accent">02.</span> Pilih nominal</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {nominals.map((n, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedNominal(i)}
                  className={`card p-4 text-left ${selectedNominal === i ? "!border-accent !bg-raise" : ""}`}
                >
                  <div className="font-semibold">{n.label}</div>
                  <div className="mono text-sm text-accent mt-1">{rupiah(n.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div>
            <h2 className="text-xl font-semibold"><span className="mono text-accent">03.</span> Metode pembayaran</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="card p-4 text-center">QRIS</div>
              <div className="card p-4 text-center">E-Wallet</div>
              <div className="card p-4 text-center">Transfer Bank</div>
              <div className="card p-4 text-center">Pulsa</div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <div className="mono text-[11px] tracking-widest text-grey">RINGKASAN ORDER</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-grey">Game</span><span>{game.name}</span></div>
              <div className="flex justify-between"><span className="text-grey">Item</span><span>{selected?.label || "—"}</span></div>
              <div className="flex justify-between"><span className="text-grey">Biaya admin</span><span className="text-accent">Rp 0</span></div>
            </div>
            <div className="border-t border-line mt-4 pt-4 flex justify-between items-center">
              <span className="text-grey text-sm">Total</span>
              <span className="mono text-2xl font-semibold">{selected ? rupiah(selected.price) : "Rp 0"}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!userId || userId.length < 4 || !selected}
              className="btn-acid block text-center px-5 py-3 mt-5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Bayar Sekarang
            </button>
            <p className="mt-3 text-[11px] text-grey text-center">Rata-rata selesai dalam 12 detik. Dana kembali penuh bila pesanan gagal.</p>
          </div>
        </aside>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-ink/95 backdrop-blur px-5 py-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] text-grey mono tracking-widest">TOTAL</div>
          <div className="mono text-lg font-semibold">{selected ? rupiah(selected.price) : "Rp 0"}</div>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!userId || userId.length < 4 || !selected}
          className="btn-acid px-6 py-3 text-sm disabled:opacity-40"
        >
          Bayar Sekarang
        </button>
      </div>

      {showCheckout && selected && (
        <CheckoutOverlay
          order={{
            game: game.name,
            userId,
            serverId: game.server ? serverId : "—",
            nominalLabel: selected.label,
            price: selected.price,
            total: selected.price,
            orderId,
            qrisUrl,
          }}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
