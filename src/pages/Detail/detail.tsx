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
  const { lang } = useLanguage();

  const [material, setMaterial] = useState("pvc");
  const [finishing, setFinishing] = useState("grommets");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  const tx = pageTx[lang as LangKey] || pageTx.en;
  const selM = MATERIALS.find((m) => m.id === material)!;
  const basePrice = 25;
  const unitPrice = basePrice + selM.priceModifier;
  const totalPrice = (unitPrice * qty).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f7f6f3]  font-sans">
      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
        {/* ═══════ LEFT: visuals ═══════ */}
        <div className="space-y-8">
          {/* Main mockup */}
          <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden shadow-sm bg-white border border-gray-100">
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
                "top-6 left-6",
                "top-6 right-6",
                "bottom-6 left-6",
                "bottom-6 right-6",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} w-5 h-5 rounded-full bg-gray-200 border-[3px] border-gray-400 shadow-inner z-10`}
                />
              ))}
            {finishing === "hem" && (
              <div className="absolute inset-5 border-[2px] border-white/40 rounded-[24px] pointer-events-none z-10" />
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {GALLERY.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-video rounded-[20px] overflow-hidden border-2 transition-all ${
                  activeImg === i
                    ? "border-[#0ea5e9] scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={g.url}
                  alt={g.label[lang as LangKey]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-2 left-0 right-0 text-center text-white text-[10px] font-black uppercase tracking-tighter">
                  {g.label[lang as LangKey]}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
            <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 text-base">
              <ShoppingCart size={20} />

              {tx.placeOrder}
            </button>
          </div>
        </div>

        {/* ═══════ RIGHT: config ═══════ */}
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-[#1a1714] mb-3 leading-tight">
              {tx.title}
            </h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              {tx.subtitle}
            </p>
          </div>

          {/* ── Materials ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">
                {tx.step1}
              </h3>
              <button className="text-xs text-[#0ea5e9] font-bold hover:underline">
                {tx.materialGuide}
              </button>
            </div>
            <div className="space-y-3">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m.id)}
                  className={`w-full flex items-center gap-4 p-5 border transition-all rounded-[24px] text-left ${
                    material === m.id
                      ? "border-[#0ea5e9] bg-white shadow-md"
                      : "border-gray-200 bg-white hover:border-[#0ea5e9]/50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      material === m.id
                        ? "border-[#0ea5e9] bg-[#0ea5e9]"
                        : "border-gray-200"
                    }`}
                  >
                    {material === m.id && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1a1714]">
                        {m.name[lang as LangKey]}
                      </span>
                      {m.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#f7f6f3] text-gray-500 border border-gray-100">
                          {m.badge[lang as LangKey]}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400 font-medium">
                      {m.desc[lang as LangKey]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ── Finishing ── */}
          <section>
            <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-gray-400">
              {tx.step2}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {FINISHINGS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishing(f.id)}
                  className={`relative border rounded-[24px] overflow-hidden transition-all group text-left bg-white ${
                    finishing === f.id
                      ? "border-[#0ea5e9] shadow-md"
                      : "border-gray-200 hover:border-[#0ea5e9]/50"
                  }`}
                >
                  <div className="h-28 w-full overflow-hidden">
                    <img
                      src={f.img}
                      alt={f.name[lang as LangKey]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-[#1a1714] text-sm">
                      {f.name[lang as LangKey]}
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      {f.desc[lang as LangKey]}
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
