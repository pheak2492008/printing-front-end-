import React, { useState } from "react";
import {
  Check,
  Truck,
  MapPin,
  Navigation,
  Home,
  CheckCircle2,
  Copy,
} from "lucide-react";
import { PAYMENT_DATA, type Tx, type OrderState } from "./orderTypes";

interface Props {
  tx: Tx;
  state: OrderState;
  setState: React.Dispatch<React.SetStateAction<OrderState>>;
  total: string;
  onConfirm: () => void;
}

export default function OrderSidebar({
  tx,
  state,
  setState,
  total,
  onConfirm,
}: Props) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof OrderState>(key: K, val: OrderState[K]) =>
    setState((s) => ({ ...s, [key]: val }));

  const canConfirm =
    isAgreed &&
    state.activeBank !== null &&
    (state.deliveryMethod === "pickup" ||
      (state.deliveryAddress.trim() && state.deliveryPhone.trim()));

  const handleShareLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      set("locationCoords", {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  const handleCopyCoords = () => {
    if (!state.locationCoords) return;
    navigator.clipboard.writeText(
      `${state.locationCoords.lat}, ${state.locationCoords.lng}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-4 lg:sticky lg:top-10 h-fit">
      <div className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl">
        <h3 className="text-2xl font-black mb-8 italic tracking-tighter">
          {tx.summary}
        </h3>

        {/* Summary rows */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Material</span>
            <span className="font-bold">
              {tx.bannerOptions[state.selectedBanner]}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Size</span>
            <span className="font-bold">
              {state.width}m × {state.length}m
            </span>
          </div>
          {state.deliveryMethod === "delivery" && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{tx.deliveryFee}</span>
              <span className="font-bold text-amber-400">+$2.00</span>
            </div>
          )}
        </div>

        {/* Delivery toggle */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
            {tx.receiving}
          </p>
          <div className="grid grid-cols-2 gap-2 bg-slate-800/50 p-1 rounded-xl">
            {(["pickup", "delivery"] as const).map((method) => (
              <button
                key={method}
                onClick={() => set("deliveryMethod", method)}
                className={`py-2.5 rounded-lg text-[10px] font-black transition-all ${
                  state.deliveryMethod === method
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-400"
                }`}
              >
                {method === "pickup"
                  ? tx.pickup.toUpperCase()
                  : tx.delivery.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Payment method selector */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">
            {tx.paymentMethod}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(PAYMENT_DATA).map(([bank, d]) => {
              const isActive = state.activeBank === bank;
              return (
                <button
                  key={bank}
                  onClick={() => set("activeBank", bank)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 transition-all ${
                    isActive
                      ? "border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-900/30"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-lg">{d.logo}</span>
                  <div className="text-left">
                    <p
                      className={`text-[10px] font-black ${isActive ? "text-blue-300" : "text-slate-400"}`}
                    >
                      {bank}
                    </p>
                    <p
                      className={`text-[8px] font-bold leading-tight ${isActive ? "text-white" : "text-slate-600"}`}
                    >
                      {d.label}
                    </p>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
            {/* Cash */}
            <button
              onClick={() => set("activeBank", "CASH")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 transition-all ${
                state.activeBank === "CASH"
                  ? "border-emerald-500 bg-emerald-600/20"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-lg">💵</span>
              <div className="text-left">
                <p
                  className={`text-[10px] font-black ${state.activeBank === "CASH" ? "text-emerald-300" : "text-slate-400"}`}
                >
                  CASH
                </p>
                <p
                  className={`text-[8px] font-bold leading-tight ${state.activeBank === "CASH" ? "text-white" : "text-slate-600"}`}
                >
                  Pay on Pickup
                </p>
              </div>
              {state.activeBank === "CASH" && (
                <div className="ml-auto w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          </div>
          {!state.activeBank && (
            <p className="text-[10px] text-amber-400 font-bold mt-2 ml-1">
              ⚠ Please select a payment method
            </p>
          )}
        </div>

        {/* Estimated Total */}
        <div className="flex justify-between items-end pt-5 border-t border-white/10 mb-6">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            {tx.totalLabel}
          </span>
          <span className="text-5xl font-black text-blue-400 tracking-tighter">
            ${total}
          </span>
        </div>

        {/* Delivery address - below total */}
        {state.deliveryMethod === "delivery" && (
          <div className="mb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="h-px bg-white/10 mb-4" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin size={11} className="text-blue-400" /> Delivery Details
            </p>

            <button
              onClick={handleShareLocation}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                state.locationCoords
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30"
              }`}
            >
              {state.locationCoords ? (
                <>
                  <CheckCircle2 size={14} /> {tx.locationShared}
                </>
              ) : (
                <>
                  <Navigation size={14} /> {tx.shareLocation}
                </>
              )}
            </button>

            {state.locationCoords && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest mb-0.5">
                    GPS
                  </p>
                  <p className="text-[10px] text-white font-black">
                    {state.locationCoords.lat.toFixed(5)},{" "}
                    {state.locationCoords.lng.toFixed(5)}
                  </p>
                </div>
                <button onClick={handleCopyCoords}>
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} className="text-slate-400" />
                  )}
                </button>
              </div>
            )}

            <textarea
              value={state.deliveryAddress}
              onChange={(e) => set("deliveryAddress", e.target.value)}
              placeholder={tx.addressPlaceholder}
              rows={2}
              className="w-full bg-slate-800/60 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-semibold placeholder-slate-600 outline-none focus:border-blue-500/50 resize-none transition-all"
            />
            <input
              type="tel"
              value={state.deliveryPhone}
              onChange={(e) => set("deliveryPhone", e.target.value)}
              placeholder={tx.phonePlaceholder}
              className="w-full bg-slate-800/60 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-semibold placeholder-slate-600 outline-none focus:border-blue-500/50 transition-all"
            />
            <input
              type="text"
              value={state.deliveryLandmark}
              onChange={(e) => set("deliveryLandmark", e.target.value)}
              placeholder={tx.landmarkPlaceholder}
              className="w-full bg-slate-800/60 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs font-semibold placeholder-slate-600 outline-none focus:border-blue-500/50 transition-all"
            />
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
              <Truck size={12} className="text-amber-400 shrink-0" />
              <p className="text-[9px] text-amber-300 font-bold">
                {tx.deliveryNote}
              </p>
            </div>
          </div>
        )}

        {/* Agree checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <div
            onClick={() => setIsAgreed(!isAgreed)}
            className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
              isAgreed
                ? "bg-blue-600 border-blue-600 shadow-lg"
                : "border-white/20 group-hover:border-white/40"
            }`}
          >
            {isAgreed && (
              <Check size={14} className="text-white" strokeWidth={4} />
            )}
          </div>
          <span className="text-[11px] leading-tight text-slate-400 group-hover:text-white transition-colors">
            {tx.agree}
          </span>
        </label>

        {/* Confirm button */}
        <button
          disabled={!canConfirm}
          onClick={onConfirm}
          className={`w-full py-6 rounded-2xl font-black text-lg transition-all active:scale-95 ${
            canConfirm
              ? "bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/40 text-white"
              : "bg-slate-800 text-slate-600 cursor-not-allowed"
          }`}
        >
          {tx.btnConfirm} {canConfirm ? "→" : "🔒"}
        </button>
      </div>
    </div>
  );
}
