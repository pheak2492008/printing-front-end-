import React, { useRef, useState } from "react";
import {
  Upload,
  MousePointerClick,
  ShieldCheck,
  Truck,
  Check,
  X,
  Plus,
  FileText,
} from "lucide-react";
import type { Tx, OrderState } from "./orderTypes";

interface Props {
  tx: Tx;
  state: OrderState;
  setState: React.Dispatch<React.SetStateAction<OrderState>>;
}

/** * UI Components */
function Badge({
  icon,
  text,
  color,
}: {
  icon: any;
  text: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-2 rounded-lg">
      <span className={color}>{icon}</span> {text}
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="bg-blue-600 text-white font-black text-sm w-8 h-8 rounded-lg flex items-center justify-center">
        {num}
      </span>
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">
        {title}
      </h3>
    </div>
  );
}

function OptionCard({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${
        active
          ? "border-blue-600 bg-blue-50 shadow-sm"
          : "border-slate-100 bg-white hover:border-slate-200"
      }`}
    >
      <span
        className={`font-bold text-sm ${active ? "text-blue-700" : "text-slate-600"}`}
      >
        {label}
      </span>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-blue-600 bg-blue-600" : "border-slate-200"}`}
      >
        {active && <Check size={12} className="text-white" strokeWidth={4} />}
      </div>
    </button>
  );
}

function InputBox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="text-[10px] font-black text-slate-400 mb-2 block uppercase">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 font-black outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

/** * Main Form Component */
export default function OrderForm({ tx, state, setState }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state to store preview URLs (blobs)
  const [previews, setPreviews] = useState<string[]>([]);

  const set = <K extends keyof OrderState>(key: K, val: OrderState[K]) =>
    setState((s) => ({ ...s, [key]: val }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);

      // 1. Create Preview URLs
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);

      // 2. Update Global State (assuming state.uploadedFiles is File[])
      // If your state doesn't have 'uploadedFiles' yet, add it to orderTypes.tsx
      set("uploadedFiles" as any, [
        ...((state as any).uploadedFiles || []),
        ...newFiles,
      ]);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the URL to save memory
    URL.revokeObjectURL(previews[index]);

    setPreviews((prev) => prev.filter((_, i) => i !== index));

    const updatedFiles = ((state as any).uploadedFiles || []).filter(
      (_: any, i: number) => i !== index,
    );
    set("uploadedFiles" as any, updatedFiles);
  };

  return (
    <div className="lg:col-span-8 space-y-8">
      {/* Hero Card */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 flex flex-col md:flex-row gap-10 shadow-sm">
        <div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80"
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-black text-slate-900 text-3xl mb-4 italic tracking-tighter">
            {tx.heroTitle}
          </h1>
          <p className="text-slate-500">{tx.heroSub}</p>
          <div className="flex gap-4 mt-6">
            <Badge
              icon={<ShieldCheck size={14} />}
              text="Weatherproof"
              color="text-emerald-500"
            />
            <Badge
              icon={<Truck size={14} />}
              text="Fast Delivery"
              color="text-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 space-y-12 shadow-sm">
        {/* Step 01 - Material */}
        <section>
          <SectionHeader num="01" title={tx.step1} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {tx.banner}
              </p>
              {tx.bannerOptions.map((opt, i) => (
                <OptionCard
                  key={i}
                  label={opt}
                  active={state.selectedBanner === i}
                  onClick={() => set("selectedBanner", i)}
                />
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {tx.sticker}
              </p>
              {tx.stickerOptions.map((opt, i) => (
                <OptionCard
                  key={i}
                  label={opt}
                  active={state.selectedSticker === i}
                  onClick={() => set("selectedSticker", i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Step 02 & 03 - Dimensions & Ink */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <SectionHeader num="02" title={tx.step2} />
            <div className="flex gap-4">
              <InputBox
                label={tx.width}
                value={state.width}
                onChange={(v) => set("width", v)}
              />
              <InputBox
                label={tx.length}
                value={state.length}
                onChange={(v) => set("length", v)}
              />
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeader num="03" title={tx.step3} />
            <select className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 font-bold outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Eco-Solvent (Standard)</option>
              <option>UV Printing (Premium)</option>
            </select>
          </div>
        </section>

        {/* Step 04 - Multiple File Upload */}
        <section className="space-y-8">
          <SectionHeader num="04" title={tx.step4} />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            multiple // Allows selecting more than one file
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Render Previews */}
            {previews.map((url, index) => (
              <div
                key={index}
                className="relative aspect-square bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden group"
              >
                <img
                  src={url}
                  alt="Upload"
                  className="w-full h-full object-contain p-2"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Upload Button Box */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                {previews.length > 0 ? (
                  <Plus className="text-blue-600" />
                ) : (
                  <Upload className="text-blue-600" />
                )}
              </div>
              <p className="text-[10px] font-black text-slate-900 uppercase">
                {previews.length > 0 ? "Add More" : tx.tapUpload}
              </p>
            </button>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
              <MousePointerClick size={18} />
              <p className="text-xs font-black uppercase tracking-widest">
                {tx.descTitle}
              </p>
            </div>
            <textarea
              value={state.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={tx.descPlaceholder}
              className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] min-h-[150px] outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
