import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Partner from "./partner";
import Reviews from "./reviwe";
/* 1. CATEGORY KEYS (Logic Only - matches product.category) */
const categories = ["banners", "carts", "business_cards", "posters", "flyers"];

/* 2. TRANSLATIONS OBJECT */
const t = {
  km: {
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    heroSub: "រកមើលបណ្តុំផលិតផលបោះពុម្ពប្រណីតរបស់យើង — ពីបដារហូតដល់នាមប័ណ្ណ។",
    getStarted: "ចាប់ផ្តើម",
    popularProducts: "ផលិតផលបោះពុម្ពពេញនិយម",
    popularSub: "រកមើលផលិតផលបោះពុម្ពដ៏ល្អបំផុតរបស់យើង",
    cats: ["បោះពុម្ព Banner", "បោះពុម្ព Stickers", "បោះពុម្ព Sticker Logos"],
    // Map these titles directly to product IDs for precision
    productTitles: {
      1: {
        title: "បដា Vinyl ខាងក្រៅ",
        sub: "ដំណោះស្រាយបោះពុម្ពធន់នឹងអាកាសធាតុ",
      },
      2: { title: "រទេះតាំងពិព័រណ៍", sub: "រទេះបង្ហាញបញ្ឈរ" },
      3: { title: "នាមប័ណ្ណលំដាប់ខ្ពស់", sub: "ការបញ្ចប់បែបប្រណីត" },
      4: { title: "ផូស្ទែរព្រឹត្តិការណ៍", sub: "ពណ៌រស់រវើក" },
      5: { title: "ខិត្តប័ណ្ណផ្សព្វផ្សាយ", sub: "ការរចនាដិត" },
      6: { title: "បដាទំហំធំ", sub: "ល្អសម្រាប់ព្រឹត្តិការណ៍ខាងក្រៅ" },
      7: {
        title: "បដាផ្ទៃក្នុង",
        sub: "ការបោះពុម្ពប្រសើរសម្រាប់ការតាំងពិព័រណ៍",
      },
    },
  },
  en: {
    heroTitle: "Discover professional printing solutions for your",
    heroEm: "next big project",
    heroSub: "Browse our curated collection of premium print products.",
    getStarted: "Get Started",
    popularProducts: "Popular Print Products",
    popularSub: "Explore our best-selling print items",
    cats: ["Print Banners", "Print Stickers", "Print Sticker Logos"],
    productTitles: {
      1: {
        title: "Vinyl Outdoor Banners",
        sub: "High-quality, durable banners for outdoor advertising.",
      },
      2: { title: "Exhibition Carts", sub: "Vertical display solutions." },
      3: {
        title: "Premium Business Cards",
        sub: "Luxury finishes and textures.",
      },
      4: { title: "Event Posters", sub: "Vibrant colors and sharp details." },
      5: {
        title: "Promotional Flyers",
        sub: "Bold designs to grab attention.",
      },
      6: { title: "Large Format Banners", sub: "Perfect for outdoor events." },
      7: {
        title: "Indoor Display Banners",
        sub: "Premium print for exhibitions.",
      },
    },
  },
  zh: {
    eyebrow: "灵感画廊",
    heroTitle: "发现适合您的印刷解决方案",
    heroEm: "下一个大项目",
    heroSub: "浏览我们精心策划的优质印刷产品系列——从横幅到名片。",
    quoteTitle: "需要定制报价？",
    quoteSub: "找不到您需要的产品？我们承接各种规模的定制项目。",
    contactSupport: "联系支持",
    learnMore: "了解更多",
    getStarted: "开始",
    popularProducts: "热门印刷产品",
    popularSub: "探索我们最畅销的印刷品",
    cats: ["打印横幅", "打印贴纸", "打印贴纸标志"],
    productTitles: {
      1: { title: "乙烯基户外横幅", sub: "耐候印刷解决方案" },
      2: { title: "展车", sub: "垂直展示车" },
      3: { title: "高档名片", sub: "豪华饰面" },
      4: { title: "活动海报", sub: "鲜艳的色彩" },
      5: { title: "宣传传单", sub: "大胆的设计" },
      6: { title: "大型横幅", sub: "适合户外活动的完美选择" },
      7: { title: "室内展示横幅", sub: "适合展览的优质印刷品" },
    },
  },
};

const marqueeLogos = [
  "PrintMaster",
  "BrandWorks",
  "LogoNation",
  "MediaHub",
  "SignCraft",
];

export default function InspirationGallery() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);

  const tx = t[lang as keyof typeof t] || t.en;

  const filtered = products.filter(
    (p) => p.category === categories[activeCategory],
  );

  return (
    <div className="bg-white min-h-screen ">
      {/* Marquee Strip */}
      <div className="w-full overflow-hidden bg-slate-900 py-4">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {marqueeLogos.concat(marqueeLogos).map((name, i) => (
            <span
              key={i}
              className="text-white/60 font-bold text-sm uppercase tracking-widest"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-slate-800 text-white py-14">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {tx.heroTitle} <span>{tx.heroEm}</span>
            </h1>
            <p className="text-blue-200 mb-8">{tx.heroSub}</p>
            <Link
              to="/order"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-bold"
            >
              {tx.getStarted}
            </Link>
          </div>
          <div className="w-[380px] h-[300px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {tx.popularProducts}
          </h2>
          <p className="text-gray-500">{tx.popularSub}</p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto mb-10 justify-center no-scrollbar">
          {tx.cats.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-6 py-2 rounded-full border font-semibold text-sm transition-all ${
                activeCategory === i
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            // Get translated title/sub using the product ID key
            const details =
              tx.productTitles[product.id as keyof typeof tx.productTitles];

            return (
              <div
                key={product.id}
                onClick={() => navigate(`/detail/${product.id}`)} // Entire card is now clickable
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-[220px] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={details?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white px-3 py-1 rounded-full bg-blue-600 shadow-sm">
                    {product.tag}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {details?.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {details?.sub}
                  </p>

                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
                    {tx.learnMore}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Reviews />
      <Partner />
    </div>
  );
}
