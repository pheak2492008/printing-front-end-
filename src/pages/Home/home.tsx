import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useLanguage } from "../../context/LanguageContext";

/* CATEGORY KEYS */
const categories = ["banners", "carts", "business_cards", "posters", "flyers"];

/* TRANSLATIONS */
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
    cats: ["បដា", "រទេះ", "នាមប័ណ្ណ", "ផូស្ទែរ", "ត្រាចែកចាយ"],
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
  },
};

/* PRODUCTS */
const products = [
  {
    id: 1,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    title: "Vinyl Outdoor Banners",
    subtitle: "Weather-resistant printing solutions",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
    category: "banners",
  },
  {
    id: 2,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    title: "Roll-Up Banners",
    subtitle: "Portable displays for events",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    category: "banners",
  },
  {
    id: 3,
    tag: "STANDING",
    tagColor: "#0ea5e9",
    title: "Exhibition Cart",
    subtitle: "Vertical display cart",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    category: "carts",
  },
  {
    id: 4,
    tag: "PREMIUM",
    tagColor: "#f59e0b",
    title: "Premium Business Cards",
    subtitle: "Luxury finishes",
    image:
      "https://images.unsplash.com/photo-1586282023338-52aa31c63327?w=600&q=80",
    category: "business_cards",
  },
  {
    id: 5,
    tag: "NEW",
    tagColor: "#ef4444",
    title: "Event Posters",
    subtitle: "Vibrant colors",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&q=80",
    category: "posters",
  },
  {
    id: 6,
    tag: "TRENDING",
    tagColor: "#06b6d4",
    title: "Promotional Flyers",
    subtitle: "Bold designs",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "flyers",
  },
];

export default function InspirationGallery() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);

  const tx = t[lang];

  const filtered = products.filter(
    (p) => p.category === categories[activeCategory],
  );

  return (
    <div className="bg-[#f7f6f3] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 pt-16">
        <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-1 text-sm text-gray-500 mb-4">
          ✦ {tx.eyebrow}
        </div>

        <h1 className="text-5xl font-bold mb-3">
          {tx.heroTitle} <span className="text-sky-500">{tx.heroEm}</span>
        </h1>

        <p className="text-gray-500 max-w-xl">{tx.heroSub}</p>
      </section>

      {/* CATEGORY TABS */}
      <div className="max-w-[1280px] mx-auto px-6 pt-10 flex gap-2 overflow-x-auto">
        {tx.cats.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className={`px-5 py-2 rounded-full border transition-all ${
              activeCategory === i
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-[1280px] mx-auto px-6 pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/detail/${product.id}`)}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
          >
            {/* IMAGE */}
            <div className="relative h-[220px] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* TAG */}
              <span
                className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                style={{ background: product.tagColor }}
              >
                {product.tag}
              </span>

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <button className="bg-white text-gray-800 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* TEXT */}
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500">{product.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CLEANER QUOTE BOX */}
      <div className="max-w-[1280px] mx-auto px-6 pb-20 p-10">
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 rounded-3xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="max-w-lg text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {tx.quoteTitle}
            </h3>

            <p className="text-gray-500 leading-relaxed">{tx.quoteSub}</p>
          </div>

          <button className="flex items-center gap-2 px-8 py-3 bg-[#1f7dd8] hover:bg-[#1666b5] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
            {tx.contactSupport} →
          </button>
        </div>
      </div>
    </div>
  );
}
