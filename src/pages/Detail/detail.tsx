import React, { useState } from "react";
import { ChevronLeft, ShoppingCart, Minus, Plus } from "lucide-react";

// ─── Types & Data ────────────────────────────────────────────────────────────

interface Material {
  id: string;
  name: string;
  desc: string;
  priceModifier: number;
  badge?: string;
}
interface Finishing {
  id: string;
  img: string;
  name: string;
  desc: string;
}
interface GalleryImage {
  url: string;
  label: string;
}

const MATERIALS: Material[] = [
  {
    id: "pvc",
    name: "Standard PVC",
    desc: "Industry standard, durable and weather resistant.",
    priceModifier: 0,
    badge: "Most Popular",
  },
  {
    id: "mesh",
    name: "Mesh",
    desc: "Perforated for wind flow, ideal for high-wind areas.",
    priceModifier: 5,
  },
  {
    id: "blockout",
    name: "Blockout",
    desc: "Opaque laminated layer to prevent light pass-through.",
    priceModifier: 8,
  },
  {
    id: "fabric",
    name: "Fabric",
    desc: "Premium soft-touch polyester for indoor events.",
    priceModifier: 12,
    badge: "Premium",
  },
];

const FINISHINGS: Finishing[] = [
  {
    id: "grommets",
    img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80",
    name: "Grommets",
    desc: "Metal eyelets",
  },
  {
    id: "hem",
    img: "https://images.unsplash.com/photo-1589363412910-337cc357662c?w=400&q=80",
    name: "Hem & Sewing",
    desc: "Reinforced edges",
  },
  {
    id: "pole",
    img: "https://images.unsplash.com/photo-1505373633572-2d039f619948?w=400&q=80",
    name: "Pole Pockets",
    desc: "Sleeve pockets",
  },
  {
    id: "cut",
    img: "https://images.unsplash.com/photo-1516515420315-92892972312f?w=400&q=80",
    name: "Clean Cut",
    desc: "Precise edge",
  },
];

const GALLERY: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    label: "Outdoor",
  },
  {
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    label: "Design Work",
  }, // Updated to match your image
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    label: "Storefront",
  },
  {
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
    label: "Exhibition",
  },
];

const MOCKUP_GRADIENTS: Record<string, string> = {
  pvc: "from-teal-700 to-teal-900",
  mesh: "from-slate-500 to-slate-700",
  blockout: "from-gray-800 to-black",
  fabric: "from-indigo-800 to-purple-900",
};

export default function BannerDetailPage() {
  const [material, setMaterial] = useState("pvc");
  const [finishing, setFinishing] = useState("grommets");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 h-14 flex items-center">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-sm font-semibold text-gray-600"
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* ═══════ LEFT COLUMN (Visuals & Order Button) ═══════ */}
        <div className="space-y-6">
          {/* Main Mockup Display */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group bg-gray-200">
            {/* The Image from Gallery that shows inside the Banner */}
            <img
              src={GALLERY[activeImg].url}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Optional Gradient Overlay (makes "YOUR BRAND" pop more) */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${MOCKUP_GRADIENTS[material]} opacity-40 mix-blend-multiply`}
            />

            {/* Grommet Overlays (Visible if Grommets selected) */}
            {finishing === "grommets" &&
              [0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`absolute ${["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"][i]} w-6 h-6 rounded-full bg-gray-400 border-[4px] border-gray-600 shadow-inner z-10`}
                />
              ))}

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </div>

          {/* Thumbnails (Clicking these changes the banner image) */}
          <div className="grid grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === i
                    ? "border-blue-500 scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={g.url}
                  alt={g.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* ── ORDER ACTION ── */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
              <ShoppingCart size={20} />
              Place Order
            </button>
          </div>
        </div>

        {/* ═══════ RIGHT COLUMN (Config) ═══════ */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Custom Vinyl Banner
            </h1>
            <p className="mt-2 text-gray-500 leading-relaxed">
              Select your preferred material and finish. The preview on the left
              updates automatically based on your choices.
            </p>
          </div>

          {/* Materials */}
          <section>
            <h3 className="font-black text-xs uppercase tracking-widest mb-4 text-gray-400">
              1. Material
            </h3>
            <div className="space-y-2">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m.id)}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-2xl transition-all ${material === m.id ? "border-blue-500 bg-blue-50/50" : "border-gray-100 bg-white hover:border-gray-200"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${material === m.id ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
                  >
                    {material === m.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <span className="block font-bold text-sm text-gray-900">
                      {m.name}
                    </span>
                    <span className="text-xs text-gray-500">{m.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Finishing */}
          <section>
            <h3 className="font-black text-xs uppercase tracking-widest mb-4 text-gray-400">
              2. Finishing
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {FINISHINGS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishing(f.id)}
                  className={`relative border-2 rounded-2xl overflow-hidden transition-all group ${finishing === f.id ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}
                >
                  <div className="h-20 w-full overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-3 text-center text-xs font-bold text-gray-800">
                    {f.name}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
