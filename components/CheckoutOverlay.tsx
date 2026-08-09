"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawDemoQR } from "@/lib/qr";
import { rupiah } from "@/lib/format";

export interface CheckoutOrder {
  game: string;
  userId: string;
  serverId: string;
  nominalLabel: string;
  price: number;
  total: number;
  orderId: string;
  qrisUrl?: string;
}

interface CheckoutOverlayProps {
  order: CheckoutOrder;
  onClose: () => void;
}

type Step = "pay" | "done" | "expired";

const DURATION = 300;
const RING_C = 119.4;

export function CheckoutOverlay({ order, onClose }: CheckoutOverlayProps) {
  const [step, setStep] = useState<Step>("pay");
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [deliverMsg, setDeliverMsg] = useState("Mengirim item… estimasi < 10 detik");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const expire = useCallback(() => setStep("expired"), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) drawDemoQR(canvas, order.orderId);
  }, [order.orderId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) { window.clearInterval(timer); expire(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [expire]);

  useEffect(() => {
    if (step !== "pay") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step, onClose]);

  useEffect(() => {
    if (step === "pay") {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [step]);

  const handlePaid = () => {
    setStep("done");
    setDeliverMsg("Mengirim item… estimasi < 10 detik");
    window.setTimeout(() => setDeliverMsg("Item sedang diproses. Cek game dalam beberapa detik."), 3200);
  };

  const handleRetry = () => { setStep("pay"); setSecondsLeft(DURATION); };

  const ringOffset = RING_C * (1 - secondsLeft / DURATION);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const low = secondsLeft <= 30;

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center sm:p-5" style={{ background: "rgba(10,10,12,.9)", backdropFilter: "blur(12px)" }}>
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* PAY STEP */}
      {step === "pay" && (
        <div className="relative w-full sm:max-w-[400px] bg-panel sm:rounded-2xl rounded-t-2xl border border-line shadow-2xl sm:m-0 m-0 max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-panel/95 backdrop-blur-xl border-b border-line px-5 py-4 flex items-center justify-between z-10">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-grey">Pembayaran</p>
              <h3 className="text-lg font-bold mt-0.5">Scan QRIS</h3>
            </div>
            <button type="button" onClick={onClose} className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-grey hover:text-paper hover:border-grey/50 transition text-base">×</button>
          </div>

          <div className="p-5 space-y-4">
            {/* Timer */}
            <div className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 bg-raise">
              <svg className="timer-ring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" stroke="rgba(255,255,255,.06)" /><circle cx="22" cy="22" r="19" stroke={low ? "#f87171" : "#c8ff2e"} strokeDasharray={String(RING_C)} strokeDashoffset={String(ringOffset)} /></svg>
              <div className="flex-1"><p className="text-[10px] text-grey uppercase tracking-[.15em]">Bayar dalam</p><p className={`text-xl font-bold mono ${low ? "text-red-400" : "text-accent"}`}>{mm}:{ss}</p></div>
              <span className="flex items-center gap-1.5 text-[11px] text-[#39e5b6]"><span className="pulse-dot" /> Menunggu</span>
            </div>

            {/* QRIS Image */}
            <div className="rounded-xl bg-white p-3 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 self-start"><span className="text-[13px] font-bold tracking-tight text-[#0b0b0c]">QRIS</span><span className="text-[9px] text-[#0b0b0c]/50 uppercase tracking-[.15em]">GAMVORA</span></div>
              {order.qrisUrl ? (
                <div className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={order.qrisUrl} alt="QRIS GAMVORA" width={190} height={190} style={{ width: "min(60vw, 190px)", height: "auto", borderRadius: 6, objectFit: "contain" }} />
                </div>
              ) : (
                <div className="flex justify-center">
                  <canvas ref={canvasRef} width={180} height={180} style={{ width: "min(60vw, 190px)", height: "min(60vw, 190px)", imageRendering: "pixelated", borderRadius: 6 }} />
                </div>
              )}
              <p className="text-[10px] text-[#0b0b0c]/50 pb-0.5">Satu QR untuk semua e-wallet &amp; m-banking</p>
            </div>

            {/* Order Details */}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-grey">Game</span><span className="font-medium">{order.game}</span></div>
              <div className="flex justify-between"><span className="text-grey">User ID</span><span className="font-medium">{order.userId}</span></div>
              <div className="flex justify-between"><span className="text-grey">Paket</span><span className="font-medium">{order.nominalLabel} · {rupiah(order.price)}</span></div>
              <div className="flex justify-between"><span className="text-grey">Order ID</span><span className="text-grey text-xs mono">{order.orderId}</span></div>
              <div className="border-t border-line pt-3 flex justify-between items-center"><span className="text-grey">Total</span><span className="text-xl font-bold accent">{rupiah(order.total)}</span></div>
            </div>

            {/* Actions */}
            <button type="button" onClick={handlePaid} className="btn-acid w-full py-3.5 text-sm font-semibold">Saya Sudah Bayar</button>
            <button type="button" onClick={onClose} className="w-full text-xs text-grey hover:text-paper transition py-2">Batalkan pesanan</button>
          </div>
        </div>
      )}

      {/* DONE STEP */}
      {step === "done" && (
        <div className="relative w-full sm:max-w-[400px] bg-panel sm:rounded-2xl rounded-t-2xl border border-line shadow-2xl sm:m-0 m-0">
          <div className="p-7 text-center">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-[rgba(57,229,182,.1)] border border-[rgba(57,229,182,.3)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#39e5b6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="text-xl font-bold mt-5">Pembayaran berhasil</h3>
            <p className="text-grey text-sm mt-2">Terima kasih! Item sedang dikirim ke akunmu.</p>
            <div className="mt-5 border border-line rounded-xl p-4 text-left space-y-2 text-sm bg-raise">
              <div className="flex justify-between"><span className="text-grey">Order ID</span><span className="text-grey text-xs mono">{order.orderId}</span></div>
              <div className="flex justify-between"><span className="text-grey">Game</span><span className="font-medium">{order.game}</span></div>
              <div className="flex justify-between"><span className="text-grey">User ID</span><span className="font-medium">{order.userId}</span></div>
              <div className="flex justify-between"><span className="text-grey">Paket</span><span className="font-medium">{order.nominalLabel}</span></div>
              <div className="border-t border-line pt-2.5 flex justify-between"><span className="text-grey">Dibayar</span><span className="accent font-bold">{rupiah(order.total)}</span></div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#39e5b6]"><span className="pulse-dot" /> {deliverMsg}</div>
            <button type="button" onClick={onClose} className="btn-acid w-full mt-5 py-3.5 text-sm font-semibold">Selesai</button>
          </div>
        </div>
      )}

      {/* EXPIRED STEP */}
      {step === "expired" && (
        <div className="relative w-full sm:max-w-[400px] bg-panel sm:rounded-2xl rounded-t-2xl border border-line shadow-2xl sm:m-0 m-0">
          <div className="p-7 text-center">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center border border-line bg-raise">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8c8c98" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            </div>
            <h3 className="text-xl font-bold mt-5">Waktu habis</h3>
            <p className="text-grey text-sm mt-2">QRIS sudah kedaluwarsa. Buat pesanan baru untuk melanjutkan.</p>
            <button type="button" onClick={handleRetry} className="btn-acid w-full mt-5 py-3.5 text-sm font-semibold">Buat QRIS Baru</button>
            <button type="button" onClick={onClose} className="w-full text-xs text-grey hover:text-paper transition mt-3 py-2">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
