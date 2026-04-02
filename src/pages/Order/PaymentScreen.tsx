import React, { useState } from "react";
import { ArrowLeft, Check, Copy, Smartphone } from "lucide-react";
import { PAYMENT_DATA, type Tx } from "../../components/orderTypes";

interface Props {
  bank: string;
  total: string;
  tx: Tx;
  onBack: () => void;
  onDone: () => void;
}

export default function PaymentScreen({
  bank,
  total,
  tx,
  onBack,
  onDone,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const data = PAYMENT_DATA[bank as keyof typeof PAYMENT_DATA];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Success screen ── */
  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50 p-8">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check size={40} className="text-emerald-400" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter mb-3">
            Order Confirmed!
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Your payment is being verified. We'll contact you shortly.
          </p>
          <button
            onClick={onDone}
            className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0f172a] z-50 overflow-y-auto">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {tx.paymentScreen}
          </p>
          <p className="text-white font-black text-lg leading-tight">
            {data.label}
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto px-4 py-8 space-y-5">
        {/* Total pill */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {tx.totalToPay}
          </span>
          <span className="text-3xl font-black text-blue-400 tracking-tighter">
            ${total}
          </span>
        </div>

        {/* ── CLEAN KHQR CARD ── */}
        <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-white">
          {/* KHQR red header */}
          <div className="bg-[#d0021b] px-6 py-4 flex items-center justify-center">
            <span className="text-white font-black text-2xl tracking-[0.15em]">
              KHQR
            </span>
          </div>

          <div className="px-6 pt-5 pb-2">
            {/* Account name & amount - mirrors real KHQR layout */}
            <p className="font-black text-slate-900 text-base">{data.name}</p>
            <div className="flex items-baseline gap-1.5 mt-1 mb-4">
              <span className="text-slate-400 text-sm">$</span>
              <span className="text-3xl font-black text-slate-900">
                {total}
              </span>
              <span className="text-slate-400 text-xs font-bold">USD</span>
            </div>

            {/* Dashed divider */}
            <div className="border-t-2 border-dashed border-slate-200 mb-5" />
          </div>

          {/* QR image — full width, no clipping, no box */}
          <div className="px-6 pb-6">
            <img
              src={data.qr}
              alt={`${bank} QR Code`}
              className="w-full h-auto rounded-2xl"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>
        </div>

        {/* Copy account name */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-0.5">
              {tx.accountName}
            </p>
            <p className="text-sm font-black text-white uppercase">
              {data.name}
            </p>
          </div>
          <button
            onClick={() => handleCopy(data.name)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all bg-white/10 hover:bg-white/20"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" strokeWidth={3} />
            ) : (
              <Copy size={14} className="text-slate-400" />
            )}
          </button>
        </div>

        {/* Instruction */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-4 flex gap-3 items-start">
          <Smartphone size={15} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-300 font-semibold leading-relaxed">
            {tx.paymentNote}
          </p>
        </div>

        {/* Confirm button */}
        <button
          onClick={() => setConfirmed(true)}
          className="w-full py-5 rounded-2xl font-black text-base text-white transition-all active:scale-95 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${data.color}, ${data.color}bb)`,
          }}
        >
          {tx.paymentDone} ✓
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}
