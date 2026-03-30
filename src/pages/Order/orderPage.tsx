import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import {
  ChevronRight,
  Upload,
  Check,
  ShieldCheck,
  Truck,
  MousePointerClick,
} from "lucide-react";

/* ── TRANSLATIONS ── */
const t = {
  en: {
    title: "Custom Outdoor Banner",
    subtitle: "Heavy-duty 440gsm printing with weather-resistant coating.",
    materialSelection: "MATERIAL SELECTION",
    banner: "01. BANNER",
    sticker: "02. STICKER",
    dimensions: "DIMENSIONS",
    widthLabel: "Width (m)",
    lengthLabel: "Length (m)",
    inkChoice: "INK CHOICE",
    finishingOptions: "FINISHING OPTIONS",
    uploadDesign: "UPLOAD DESIGN FILE",
    tapToUpload: "Tap to upload file",
    uploadSub: "JPEG, PNG, or PDF (max 50MB)",
    estimatedTotal: "ESTIMATED TOTAL",
    checkout: "Proceed to Checkout",
    summary: "Order Summary",
    bannerOptions: ["Standard Flex", "UV High Gloss", "Mesh Banner"],
    stickerOptions: ["White Vinyl", "Clear Sticker", "3M Premium"],
    inkOptions: ["Eco-Solvent", "UV Ink", "Latex"],
    finishingOpts: ["Grommets", "Hems", "Pockets", "Velcro"],
  },
  km: {
    title: "បដាផ្សព្វផ្សាយខាងក្រៅ",
    subtitle: "ការបោះពុម្ពគុណភាពខ្ពស់ 440gsm ធន់នឹងកម្តៅថ្ងៃ។",
    materialSelection: "ការជ្រើសរើសសម្ភារៈ",
    banner: "០១. ប្រភេទបដា",
    sticker: "០២. ប្រភេទស្ទីគ័រ",
    dimensions: "ទំហំផលិតផល",
    widthLabel: "ទទឹង (ម៉ែត្រ)",
    lengthLabel: "បណ្តោយ (ម៉ែត្រ)",
    inkChoice: "ជម្រើសទឹកថ្នាំ",
    finishingOptions: "សេវាកម្មបន្ថែម",
    uploadDesign: "បញ្ជូនឯកសាររចនា",
    tapToUpload: "ចុចទីនេះដើម្បីបញ្ចូលឯកសារ",
    uploadSub: "ប្រភេទ JPEG, PNG, ឬ PDF (អតិបរមា 50MB)",
    estimatedTotal: "តម្លៃសរុបប៉ាន់ស្មាន",
    checkout: "បន្តទៅការទូទាត់",
    summary: "ព័ត៌មានលម្អិត",
    bannerOptions: ["បដាស្តង់ដារ", "បដាប្រភេទ UV", "បដាសំណាញ់"],
    stickerOptions: ["ស្ទីគ័រពណ៌ស", "ស្ទីគ័រថ្លា", "ស្ទីគ័រ 3M"],
    inkOptions: ["Eco-Solvent", "ទឹកថ្នាំ UV", "ទឹកថ្នាំ Latex"],
    finishingOpts: ["ចោះប៊ុតុង", "បត់គែម", "ស៊កបង្គោល", "បិទស្កុត"],
  },
};

const PRICE_PER_SQM = 2.01;

export default function OrderPage() {
  const { lang } = useLanguage();
  const { isAuthenticated } = useAuth(); // Hook into your AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const tx = (t as any)[lang] || t.en;

  // --- STATE ---
  const [selectedBanner, setSelectedBanner] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState(0);
  const [width, setWidth] = useState("1.0");
  const [length, setLength] = useState("2.0");
  const [selectedInk, setSelectedInk] = useState(0);
  const [finishing, setFinishing] = useState([true, false, false, false]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const area = parseFloat(width || "0") * parseFloat(length || "0");
  const total = (area * PRICE_PER_SQM).toFixed(2);

  // --- LOGIC ---
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // User is not logged in. Redirect to login.
      // Pass 'state' so login page knows to send them back to /order
      navigate("/login", { state: { from: location.pathname } });
    } else {
      // User is logged in. Move to final payment/shipping.
      navigate("/checkout/shipping");
    }
  };

  const toggleFinishing = (i: number) => {
    setFinishing((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="bg-[#fcfcfb] min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex items-center gap-2 text-sm text-gray-400">
        <span
          onClick={() => navigate("/")}
          className="hover:text-blue-600 cursor-pointer"
        >
          Home
        </span>
        <ChevronRight size={14} />
        <span className="text-slate-900 font-semibold">{tx.title}</span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* CONFIGURATION COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-10 border border-slate-100 shadow-sm">
              <div className="w-full md:w-1/3 aspect-square rounded-3xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&q=80"
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h1 className="font-black text-slate-900 text-4xl mb-4 leading-tight">
                  {tx.title}
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {tx.subtitle}
                </p>
                <div className="flex gap-6 mt-8">
                  <Badge
                    icon={<ShieldCheck size={16} />}
                    text="Weatherproof"
                    color="emerald"
                  />
                  <Badge
                    icon={<Truck size={16} />}
                    text="Fast Delivery"
                    color="blue"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 space-y-12 shadow-sm">
              <section>
                <SectionHeader num="01" title={tx.materialSelection} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {tx.banner}
                    </p>
                    {tx.bannerOptions.map((opt: string, i: number) => (
                      <SelectCard
                        key={i}
                        label={opt}
                        active={selectedBanner === i}
                        onClick={() => setSelectedBanner(i)}
                      />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {tx.sticker}
                    </p>
                    {tx.stickerOptions.map((opt: string, i: number) => (
                      <SelectCard
                        key={i}
                        label={opt}
                        active={selectedSticker === i}
                        onClick={() => setSelectedSticker(i)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <SectionHeader num="02" title={tx.dimensions} />
                  <div className="flex gap-4">
                    <InputBox
                      label={tx.widthLabel}
                      value={width}
                      onChange={setWidth}
                    />
                    <InputBox
                      label={tx.lengthLabel}
                      value={length}
                      onChange={setLength}
                    />
                  </div>
                </div>
                <div>
                  <SectionHeader num="03" title={tx.inkChoice} />
                  <select
                    value={selectedInk}
                    onChange={(e) => setSelectedInk(Number(e.target.value))}
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 font-bold outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {tx.inkOptions.map((opt: string, i: number) => (
                      <option key={i} value={i}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section>
                <SectionHeader num="04" title={tx.uploadDesign} />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center cursor-pointer hover:bg-blue-50/50 transition-all"
                >
                  <Upload size={32} className="mx-auto mb-4 text-blue-600" />
                  <p className="font-black text-slate-900">
                    {uploadedFile ? uploadedFile.name : tx.tapToUpload}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files?.[0] && setUploadedFile(e.target.files[0])
                    }
                  />
                </div>
              </section>
            </div>
          </div>

          {/* STICKY SUMMARY SIDEBAR */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/20">
              <h3 className="text-2xl font-black mb-8">{tx.summary}</h3>
              <div className="space-y-5 mb-10">
                <SummaryRow
                  label="Material"
                  value={tx.bannerOptions[selectedBanner]}
                />
                <SummaryRow label="Size" value={`${width}m × ${length}m`} />
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-end">
                  <span className="text-slate-400 text-[10px] font-bold uppercase">
                    {tx.estimatedTotal}
                  </span>
                  <span className="text-5xl font-black text-blue-400">
                    ${total}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/40 transition-all active:scale-95"
              >
                {tx.checkout} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
const SectionHeader = ({ num, title }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="bg-blue-50 text-blue-600 font-black text-sm w-8 h-8 rounded-lg flex items-center justify-center">
      {num}
    </span>
    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic">
      {title}
    </h3>
  </div>
);

const SelectCard = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all ${active ? "border-blue-600 bg-blue-50" : "border-slate-100 bg-white hover:border-slate-200"}`}
  >
    <span
      className={`font-bold ${active ? "text-blue-700" : "text-slate-600"}`}
    >
      {label}
    </span>
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? "border-blue-600 bg-blue-600" : "border-slate-200"}`}
    >
      {active && <Check size={14} className="text-white" />}
    </div>
  </button>
);

const InputBox = ({ label, value, onChange }: any) => (
  <div className="flex-1">
    <label className="text-[10px] font-black text-slate-400 mb-3 block uppercase">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 font-black outline-none focus:border-blue-500"
    />
  </div>
);

const SummaryRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center text-sm font-medium">
    <span className="text-slate-500">{label}</span>
    <span className="text-slate-200 font-bold">{value}</span>
  </div>
);

const Badge = ({ icon, text, color }: any) => (
  <div
    className={`flex items-center gap-2 text-xs font-bold ${color === "emerald" ? "text-emerald-600" : "text-blue-600"}`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center ${color === "emerald" ? "bg-emerald-50" : "bg-blue-50"}`}
    >
      {icon}
    </div>
    {text}
  </div>
);
