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
  const [pickedNominal, setPickedNominal] = useState<number | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderId, setOrderId] = useState("");

  const nominals = game.nominals || [];
  const selected = pickedNominal !== null ? nominals[pickedNominal] : null;

  const handleCheckout = () => {
    if (!userId.trim() || userId.length < 4) return;
    if (game.server && !serverId.trim()) return;
    if (!selected) return;
    setOrderId("GV" + Date.now().toString().slice(-8));
    setShowCheckout(true);
  };

  return (
    <>
      {/* DESKTOP LAYOUT - like toplixa */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        {/* Left: Form */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">01</span>
              Masukkan akun
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-grey mb-1.5 block">{game.user_id_label || "User ID"}</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder={game.user_id_placeholder || "12345678"}
                  className="w-full rounded-xl bg-raise border border-line px-4 py-3.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 text-paper placeholder:text-grey/50 transition"
                />
              </div>
              {game.server && (
                <div>
                  <label className="text-xs text-grey mb-1.5 block">{game.serverLabel || "Server ID"}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={serverId}
                    onChange={(e) => setServerId(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="2201"
                    className="w-full rounded-xl bg-raise border border-line px-4 py-3.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 text-paper placeholder:text-grey/50 transition"
                  />
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-grey">{game.hint}</p>
          </div>

          {/* Step 2 */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm font-bold">02</span>
              Pilih nominal
            </h2>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nominals.map((n, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPickedNominal(i)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    pickedNominal === i
                      ? "border-accent bg-accent/10 shadow-[0_0_0_1px_rgba(200,255,46,.3)]"
                      : "border-line bg-raise hover:border-grey/50 hover:bg-surface2"
                  }`}
                >
                  <div className="font-semibold text-sm">{n.label}</div>
                  <div className="mono text-sm text-accent mt-1">{rupiah(n.price)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-line bg-panel p-6">
            <p className="text-[11px] uppercase tracking-[.15em] text-grey font-medium">Ringkasan Order</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-grey">Game</span><span className="font-medium">{game.name}</span></div>
              <div className="flex justify-between"><span className="text-grey">Item</span><span className="font-medium">{selected?.label || "—"}</span></div>
              <div className="flex justify-between"><span className="text-grey">Biaya admin</span><span className="text-accent font-medium">Rp 0</span></div>
            </div>
            <div className="border-t border-line mt-5 pt-5 flex justify-between items-center">
              <span className="text-grey text-sm">Total</span>
              <span className="mono text-2xl font-bold">{selected ? rupiah(selected.price) : "Rp 0"}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!userId || userId.length < 4 || !selected}
              className="w-full mt-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed btn-acid"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT - food detail style */}
      <div className="lg:hidden">
        <div className="space-y-4">
          {/* Game Info Card */}
          <div className="rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-center gap-4">
              <div className="logo-tile w-16 h-16 p-2.5 shrink-0">
                <img src={game.logo} alt={game.name} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg font-bold truncate">{game.name}</h1>
                <p className="text-sm text-grey mt-0.5">{game.cur}</p>
              </div>
            </div>
          </div>

          {/* Account Input */}
          <div className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
              <span className="text-accent">01</span> Masukkan akun
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                value={userId}
                onChange={(e) => setUserId(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={game.user_id_label || "User ID"}
                className="w-full rounded-xl bg-raise border border-line px-4 py-3.5 text-sm outline-none focus:border-accent text-paper placeholder:text-grey/50"
              />
              {game.server && (
                <input
                  type="text"
                  inputMode="numeric"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder={game.serverLabel || "Server ID"}
                  className="w-full rounded-xl bg-raise border border-line px-4 py-3.5 text-sm outline-none focus:border-accent text-paper placeholder:text-grey/50"
                />
              )}
            </div>
          </div>

          {/* Nominal Selection */}
          <div className="rounded-2xl border border-line bg-panel p-5">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
              <span className="text-accent">02</span> Pilih nominal
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {nominals.map((n, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPickedNominal(i)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    pickedNominal === i
                      ? "border-accent bg-accent/10"
                      : "border-line bg-raise"
                  }`}
                >
                  <div className="text-sm font-semibold">{n.label}</div>
                  <div className="text-xs text-accent mt-0.5 mono">{rupiah(n.price)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-line bg-panel/95 backdrop-blur-xl px-5 py-3.5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] text-grey mono tracking-widest">TOTAL</p>
          <p className="mono text-xl font-bold">{selected ? rupiah(selected.price) : "Rp 0"}</p>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!userId || userId.length < 4 || !selected}
          className="btn-acid px-8 py-3.5 text-sm font-semibold disabled:opacity-40 rounded-xl"
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
