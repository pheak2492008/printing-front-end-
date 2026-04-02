import {
  useState,
  type JSXElementConstructor,
  type Key,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Partner from "./partner";
import Reviews from "./reviwe";

/* 1. CATEGORY KEYS (Logic Only - matches product.category) */
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
    learnMore: "ស្វែងយល់បន្ថែម",
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
    eyebrow: "Inspiration Gallery",
    heroTitle: "Discover professional printing solutions for your",
    heroEm: "next big project",
    heroSub:
      "Browse our curated collection of premium print products — from banners to business cards.",
    quoteTitle: "Need a Custom Quote?",
    quoteSub:
      "Can't find what you're looking for? We handle custom projects of all sizes.",
    contactSupport: "Contact Support",
    learnMore: "Learn More",
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
/* Infinite scroll marquee strip logos (top row) */
const marqueeLogos = [
  "PrintMaster",
  "BrandWorks",
  "LogoNation",
  "MediaHub",
  "SignCraft",
  "EventForge",
  "PixelPress",
  "InkHouse",
  "PrintMaster",
  "BrandWorks",
  "LogoNation",
  "MediaHub",
];

const products = [
  {
    id: 1,
    tag: "BESTSELLER",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
  },
  {
    id: 2,
    tag: "STANDING",
    tagColor: "#2563eb",
    category: "carts",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  {
    id: 3,
    tag: "PREMIUM",
    tagColor: "#2563eb",
    category: "business_cards",
    image:
      "https://images.unsplash.com/photo-1586282023338-52aa31c63327?w=600&q=80",
  },
  {
    id: 4,
    tag: "NEW",
    tagColor: "#2563eb",
    category: "posters",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&q=80",
  },
  {
    id: 5,
    tag: "TRENDING",
    tagColor: "#2563eb",
    category: "flyers",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 6,
    tag: "NEW",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    id: 7,
    tag: "POPULAR",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&q=80",
  },
  {
    id: 8,
    tag: "TRENDING",
    tagColor: "#2563eb",
    category: "flyers",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 9,
    tag: "NEW",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80",
  },
  {
    id: 10,
    tag: "POPULAR",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&q=80",
  },
  {
    id: 11,
    tag: "BESTSELLER",
    tagColor: "#2563eb",
    category: "banners",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
  },
];

const HERO_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80";

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
      {/* ── Marquee Strip ── */}
      <div
        className="w-full overflow-hidden "
        style={{ background: "linear-gradient(90deg,#0f172a,#1e3a5f,#0f172a)" }}
      >
        <div
          className="flex gap-12 py-4 whitespace-nowrap"
          style={{
            animation: "marquee 20s linear infinite",
            width: "max-content",
          }}
        >
          {marqueeLogos.map(
            (
              name:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined,
              i: Key | null | undefined,
            ) => (
              <span
                key={i}
                className="text-white/60 font-bold text-sm uppercase tracking-widest px-4"
              >
                {name}
              </span>
            ),
          )}
        </div>
        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>
      <section
        className="w-full"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0c2340 100%)",
          minHeight: 380,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-white text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {tx.heroTitle} <span className="text-white">{tx.heroEm}</span>
            </h1>
            <p className="text-blue-200 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
              {tx.heroSub}
            </p>
            <Link
              to="/order"
              className="px-8 py-3 bg-[#eb2546] hover:bg-red-600 text-white font-bold rounded-lg transition-all shadow-md text-sm"
            >
              {tx.getStarted}
            </Link>
          </div>

          <div className="flex-shrink-0 w-full md:w-[380px] h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={HERO_BANNER_IMAGE}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 pt-14 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {tx.popularProducts}
          </h2>
          <p className="text-gray-500 text-base">{tx.popularSub}</p>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-10 justify-center">
          {tx.cats.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-6 py-2 rounded-full border transition-all font-semibold text-sm whitespace-nowrap ${
                activeCategory === i
                  ? "bg-[#2532eb] text-white border-[#2563eb] shadow-md"
                  : "bg-white text-gray-600 border-gray-300 hover:border-red-300"
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

      {/* QUOTE BOX */}
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="bg-white border border-gray-100 rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {tx.quoteTitle}
            </h3>
            <p className="text-gray-500 text-lg">{tx.quoteSub}</p>
          </div>

          {/* Wrap the button in a Link to /faq */}
          <Link to="/faq">
            <button className="px-10 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg whitespace-nowrap">
              {tx.contactSupport} →
            </button>
          </Link>
        </div>
      </div>
      <Reviews />
      <Partner />
    </div>
  );
}
