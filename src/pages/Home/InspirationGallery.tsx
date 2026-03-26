import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useLanguage } from "../../context/LanguageContext";

/* 1. INTERNAL CATEGORY KEYS (Logic only) */
const categories = ["banners", "carts", "business_cards", "posters", "flyers"];

/* 2. TRANSLATIONS OBJECT */
const t = {
  km: {
    eyebrow: "វិចិត្រសាលការបំផុស",
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    heroSub: "រកមើលបណ្តុំផលិតផលបោះពុម្ពប្រណីតរបស់យើង — ពីបដារហូតដល់នាមប័ណ្ណ។",
    quoteTitle: "ត្រូវការតម្លៃផ្ទាល់ខ្លួន?",
    quoteSub:
      "រក​មិន​ឃើញ​អ្វី​ដែល​អ្នក​ចង់​បាន? យើង​ដោះស្រាយ​គម្រោង​ផ្ទាល់ខ្លួន​គ្រប់​ទំហំ។",
    contactSupport: "ទំនាក់ទំនងការគាំទ្រ",
    cats: ["បដា", "រទេះ", "នាមប័ណ្ណ", "ផូស្ទែរ", "ខិត្តប័ណ្ណ"],
    learnMore: "ស្វែងយល់បន្ថែម",
    // Titles and Subtitles mapped to products 1-6
    productItems: [
      { title: "បដា Vinyl ខាងក្រៅ", sub: "ដំណោះស្រាយបោះពុម្ពធន់នឹងអាកាសធាតុ" },
      { title: "បដា Roll-Up", sub: "អេក្រង់ចល័តសម្រាប់ព្រឹត្តិការណ៍" },
      { title: "រទេះតាំងពិព័រណ៍", sub: "រទេះបង្ហាញបញ្ឈរ" },
      { title: "នាមប័ណ្ណលំដាប់ខ្ពស់", sub: "ការបញ្ចប់បែបប្រណីត" },
      { title: "ផូស្ទែរព្រឹត្តិការណ៍", sub: "ពណ៌រស់រវើក" },
      { title: "ខិត្តប័ណ្ណផ្សព្វផ្សាយ", sub: "ការរចនាដិត" },
    ],
  },
  en: {
    eyebrow: "Inspiration Gallery",
    heroTitle: "Discover printing solutions for your",
    heroEm: "next big project",
    heroSub:
      "Browse our curated collection of premium print products — from banners to business cards.",
    quoteTitle: "Need a Custom Quote?",
    quoteSub:
      "Can't find what you're looking for? We handle custom projects of all sizes.",
    contactSupport: "Contact Support",
    cats: ["Banners", "Carts", "Business Cards", "Posters", "Flyers"],
    learnMore: "Learn More",
    productItems: [
      {
        title: "Vinyl Outdoor Banners",
        sub: "Weather-resistant printing solutions",
      },
      { title: "Roll-Up Banners", sub: "Portable displays for events" },
      { title: "Exhibition Cart", sub: "Vertical display cart" },
      { title: "Premium Business Cards", sub: "Luxury finishes" },
      { title: "Event Posters", sub: "Vibrant colors" },
      { title: "Promotional Flyers", sub: "Bold designs" },
    ],
  },
  zh: {
    eyebrow: "灵感画廊",
    heroTitle: "发现适合您的印刷解决方案",
    heroEm: "下一个大项目",
    heroSub: "浏览我们精心策划的优质印刷产品系列——从横幅到名片。",
    quoteTitle: "需要定制报价？",
    quoteSub: "找不到您需要的产品？我们承接各种规模的定制项目。",
    contactSupport: "联系支持",
    cats: ["横幅", "货车", "名片", "海报", "传单"],
    learnMore: "了解更多",
    productItems: [
      { title: "乙烯基户外横幅", sub: "耐候印刷解决方案" },
      { title: "易拉宝横幅", sub: "活动便携式展示" },
      { title: "展车", sub: "垂直展示车" },
      { title: "高档名片", sub: "豪华饰面" },
      { title: "活动海报", sub: "鲜艳的色彩" },
      { title: "宣传传单", sub: "大胆的设计" },
    ],
  },
};

/* 3. PRODUCT METADATA (Source of truth for ID/Image/Tag) */
const products = [
  {
    id: 1,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
  },
  {
    id: 2,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    id: 3,
    tag: "STANDING",
    tagColor: "#0ea5e9",
    category: "carts",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    id: 4,
    tag: "PREMIUM",
    tagColor: "#f59e0b",
    category: "business_cards",
    image:
      "https://images.unsplash.com/photo-1586282023338-52aa31c63327?w=600&q=80",
  },
  {
    id: 5,
    tag: "NEW",
    tagColor: "#ef4444",
    category: "posters",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&q=80",
  },
  {
    id: 6,
    tag: "TRENDING",
    tagColor: "#06b6d4",
    category: "flyers",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

export default function InspirationGallery() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);

  // Safely get translations based on context
  const tx = t[lang as keyof typeof t] || t.en;

  const filtered = products.filter(
    (p) => p.category === categories[activeCategory],
  );

  return (
    <div className="bg-[#f9f9f7] min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <header className="max-w-[1280px] mx-auto px-6 pt-16">
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-[13px] font-bold text-gray-400 mb-6 shadow-sm">
          ✦ <span className="pt-0.5">{tx.eyebrow}</span>
        </div>
        <h1 className="text-5xl font-extrabold text-[#1a1714] mb-4 leading-tight">
          {tx.heroTitle}{" "}
          <span className="text-sky-500 italic">{tx.heroEm}</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
          {tx.heroSub}
        </p>
      </header>

      {/* CATEGORY TABS */}
      <div className="max-w-[1280px] mx-auto px-6 pt-10 flex gap-3 overflow-x-auto no-scrollbar">
        {tx.cats.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
              activeCategory === i
                ? "bg-sky-500 border-sky-500 text-white shadow-md"
                : "bg-white border-gray-200 text-gray-500 hover:border-sky-300"
            }`}
          >
            <span className="pt-0.5 inline-block">{cat}</span>
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <main className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/detail/${product.id}`)}
            className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            {/* Image & Tag */}
            <div className="relative h-[240px] overflow-hidden">
              <img
                src={product.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span
                className="absolute top-4 left-4 text-[10px] font-black text-white px-3 py-1 rounded-full"
                style={{ background: product.tagColor }}
              >
                {product.tag}
              </span>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <div className="bg-white px-5 py-2 rounded-full font-bold text-sm shadow-lg">
                  {tx.learnMore}
                </div>
              </div>
            </div>

            {/* Translated Content */}
            <div className="p-7">
              <h3 className="font-bold text-xl text-gray-900 mb-1 leading-tight">
                {tx.productItems[product.id - 1]?.title}
              </h3>
              <p className="text-gray-400 text-sm font-medium">
                {tx.productItems[product.id - 1]?.sub}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* CTA SECTION */}
      <footer className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="bg-white border border-gray-100 rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {tx.quoteTitle}
            </h3>
            <p className="text-gray-500">{tx.quoteSub}</p>
          </div>
          <button className="px-8 py-3.5 bg-[#1a1714] text-white font-bold rounded-xl hover:bg-black transition-all">
            {tx.contactSupport} →
          </button>
        </div>
      </footer>
    </div>
  );
}
