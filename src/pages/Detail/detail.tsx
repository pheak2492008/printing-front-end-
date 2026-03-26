import React, { useState } from "react";
import { ChevronLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import type { LangKey } from "../../locales/translations";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Material {
  id: string;
  name: Record<LangKey, string>;
  desc: Record<LangKey, string>;
  priceModifier: number;
  badge?: Record<LangKey, string>;
}

interface Finishing {
  id: string;
  img: string;
  name: Record<LangKey, string>;
  desc: Record<LangKey, string>;
}

interface GalleryImage {
  url: string;
  label: Record<LangKey, string>;
}

// ─── Page-level translations ──────────────────────────────────────────────────

const pageTx: Record<
  LangKey,
  {
    back: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    placeOrder: string;
    qty: string;
    materialGuide: string;
    totalPrice: string;
    perUnit: string;
    unit: string;
    units: string;
  }
> = {
  km: {
    back: "ត្រឡប់ក្រោយ",
    title: "បដាប្លាស្ទិចផ្ទាល់ខ្លួន",
    subtitle:
      "ជ្រើសរើសសម្ភារៈ និងការបញ្ចប់ដែលអ្នកចូលចិត្ត។ ការមើលពីខាងឆ្វេងនឹងធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ។",
    step1: "១. សម្ភារៈ",
    step2: "២. ការបញ្ចប់",
    step3: "៣. បរិមាណ",
    placeOrder: "ដាក់ការបញ្ជាទិញ",
    qty: "បរិមាណ",
    materialGuide: "មគ្គុទ្ទេសសម្ភារៈ →",
    totalPrice: "តម្លៃសរុប",
    perUnit: "ក្នុងមួយឯកតា",
    unit: "ឯកតា",
    units: "ឯកតា",
  },
  en: {
    back: "Back",
    title: "Custom Vinyl Banner",
    subtitle:
      "Select your preferred material and finish. The preview on the left updates automatically.",
    step1: "1. Material",
    step2: "2. Finishing",
    step3: "3. Quantity",
    placeOrder: "Place Order",
    qty: "Quantity",
    materialGuide: "Material Guide →",
    totalPrice: "Total Price",
    perUnit: "per unit",
    unit: "unit",
    units: "units",
  },
  zh: {
    back: "返回",
    title: "定制乙烯基横幅",
    subtitle: "选择您偏好的材料和完成方式。左侧预览将自动更新。",
    step1: "1. 材料",
    step2: "2. 完成选项",
    step3: "3. 数量",
    placeOrder: "下订单",
    qty: "数量",
    materialGuide: "材料指南 →",
    totalPrice: "总价",
    perUnit: "每件",
    unit: "件",
    units: "件",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const MATERIALS: Material[] = [
  {
    id: "pvc",
    name: { km: "PVC ស្តង់ដារ", en: "Standard PVC", zh: "标准PVC" },
    desc: {
      km: "ធន់ ស្ថិតស្ថេរ និងធន់នឹងអាកាសធាតុ",
      en: "Industry standard, durable and weather resistant.",
      zh: "行业标准，耐用且防风雨。",
    },
    priceModifier: 0,
    badge: { km: "ពេញនិយម", en: "Most Popular", zh: "最受欢迎" },
  },
  {
    id: "mesh",
    name: { km: "មែស", en: "Mesh", zh: "网格布" },
    desc: {
      km: "ដែលត្រូវបានគេចោះ ដើម្បីឱ្យខ្យល់ចូល សម្រាប់តំបន់ខ្យល់ខ្លាំង",
      en: "Perforated for wind flow, ideal for high-wind areas.",
      zh: "穿孔以利于通风，适合强风地区。",
    },
    priceModifier: 5,
  },
  {
    id: "blockout",
    name: { km: "ប្លុកអៅ", en: "Blockout", zh: "遮光布" },
    desc: {
      km: "ស្រទាប់បិទបាំងដើម្បីការពារពន្លឺ",
      en: "Opaque laminated layer to prevent light pass-through.",
      zh: "不透明层压层，防止透光。",
    },
    priceModifier: 8,
  },
  {
    id: "fabric",
    name: { km: "ក្រណាត់", en: "Fabric", zh: "布料" },
    desc: {
      km: "ប៉ូលីអេស្ទែររលោងនិងទន់ ឥឡូវនេះ",
      en: "Premium soft-touch polyester for indoor events.",
      zh: "高档软触感聚酯纤维，适合室内活动。",
    },
    priceModifier: 12,
    badge: { km: "ប្រណីត", en: "Premium", zh: "高级" },
  },
];

const FINISHINGS: Finishing[] = [
  {
    id: "grommets",
    img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80",
    name: { km: "ក្រវ៉ាត់លោហៈ", en: "Grommets", zh: "孔眼" },
    desc: { km: "ក្រវ៉ាត់លោហៈ", en: "Metal eyelets", zh: "金属扣眼" },
  },
  {
    id: "hem",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
    name: { km: "ការដេរគែម", en: "Hem & Sewing", zh: "折边缝合" },
    desc: { km: "គែមដេររឹងមាំ", en: "Reinforced edges", zh: "加固边缘" },
  },
  {
    id: "pole",
    img: "https://images.unsplash.com/photo-1505373633572-2d039f619948?w=400&q=80",
    name: { km: "ហោប៉ៅសសរ", en: "Pole Pockets", zh: "旗杆袋" },
    desc: { km: "ហោប៉ៅសម្រាប់សសរ", en: "Sleeve pockets", zh: "套管口袋" },
  },
  {
    id: "cut",
    img: "https://images.unsplash.com/photo-1516515420315-92892972312f?w=400&q=80",
    name: { km: "កាត់ស្អាត", en: "Clean Cut", zh: "精确裁切" },
    desc: { km: "គែមច្រាស់ទៀតសម្រាប់", en: "Precise edge", zh: "精确边缘" },
  },
];

const GALLERY: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    label: { km: "ខាងក្រៅ", en: "Outdoor", zh: "户外" },
  },
  {
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    label: { km: "ការរចនា", en: "Design Work", zh: "设计" },
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    label: { km: "ហាង", en: "Storefront", zh: "店面" },
  },
  {
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
    label: { km: "តាំងពិព័រណ៍", en: "Exhibition", zh: "展览" },
  },
];

const MOCKUP_GRADIENTS: Record<string, string> = {
  pvc: "from-teal-700 to-teal-900",
  mesh: "from-slate-500 to-slate-700",
  blockout: "from-gray-800 to-black",
  fabric: "from-indigo-800 to-purple-900",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerDetailPage() {
  // Pull lang from the SHARED context — same as Navbar & Gallery
  const { lang } = useLanguage();

  const [material, setMaterial] = useState("pvc");
  const [finishing, setFinishing] = useState("grommets");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const tx = pageTx[lang];
  const selM = MATERIALS.find((m) => m.id === material)!;
  const basePrice = 25;
  const unitPrice = basePrice + selM.priceModifier;
  const totalPrice = (unitPrice * qty).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={18} />
          {tx.back}
        </button>
        <span className="text-sm font-bold text-gray-800">{tx.title}</span>
        <div className="w-20" /> {/* spacer to center title */}
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
        {/* ═══════ LEFT: visuals ═══════ */}
        <div className="space-y-6">
          {/* Main mockup */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
            <img
              src={GALLERY[activeImg].url}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${MOCKUP_GRADIENTS[material]} opacity-40 mix-blend-multiply transition-all duration-500`}
            />
            {finishing === "grommets" &&
              [
                "top-4 left-4",
                "top-4 right-4",
                "bottom-4 left-4",
                "bottom-4 right-4",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-6 h-6 rounded-full bg-gray-300 border-[4px] border-gray-500 shadow-inner z-10`}
                />
              ))}
            {finishing === "hem" && (
              <div className="absolute inset-4 border-[3px] border-white/30 rounded-2xl pointer-events-none z-10" />
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === i
                    ? "border-blue-500 scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <img
                  src={g.url}
                  alt={g.label[lang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-1 left-0 right-0 text-center text-white text-[9px] font-bold">
                  {g.label[lang]}
                </span>
              </button>
            ))}
          </div>

          {/* Order */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
            <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 text-base">
              <ShoppingCart size={20} />
              {tx.placeOrder}
            </button>
          </div>
        </div>

        {/* ═══════ RIGHT: config ═══════ */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {tx.title}
            </h1>
            <p className="mt-2 text-gray-500 leading-relaxed text-sm">
              {tx.subtitle}
            </p>
          </div>

          {/* ── Materials ── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">
                {tx.step1}
              </h3>
              <button className="text-xs text-blue-500 font-semibold hover:text-blue-700 transition-colors">
                {tx.materialGuide}
              </button>
            </div>
            <div className="space-y-2">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m.id)}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-2xl text-left transition-all ${
                    material === m.id
                      ? "border-blue-500 bg-blue-50/60 shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {/* Radio dot */}
                  <span
                    className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                      material === m.id
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {material === m.id && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">
                        {m.name[lang]}
                      </span>
                      {m.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            m.id === "fabric"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {m.badge[lang]}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5 block leading-snug">
                      {m.desc[lang]}
                    </span>
                  </div>

                  <span
                    className={`flex-shrink-0 text-xs font-bold ${
                      material === m.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {m.priceModifier > 0 ? `+$${m.priceModifier}` : "✓ Free"}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ── Finishing ── */}
          <section>
            <h3 className="font-black text-xs uppercase tracking-widest mb-3 text-gray-400">
              {tx.step2}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {FINISHINGS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishing(f.id)}
                  className={`relative border-2 rounded-2xl overflow-hidden transition-all group text-left ${
                    finishing === f.id
                      ? "border-blue-500 shadow-md"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="h-24 w-full overflow-hidden relative">
                    <img
                      src={f.img}
                      alt={f.name[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {finishing === f.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 shadow">
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2.5 transition-colors ${finishing === f.id ? "bg-blue-50" : "bg-white"}`}
                  >
                    <p className="font-bold text-sm text-gray-900">
                      {f.name[lang]}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {f.desc[lang]}
                    </p>
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
