import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // 1. Import your custom hook
import { useLanguage } from "../../context/LanguageContext";

type LangKey = "km" | "en" | "zh";

const languages: { code: LangKey; label: string; flag: string }[] = [
  { code: "km", label: "ខ្មែរ", flag: "🇰🇭" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

// --- Translation Object ---
const t = {
  km: {
    eyebrow: "វិចិត្រសាលការបំផុស",
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    heroSub: "រកមើលបណ្តុំផលិតផលបោះពុម្ពប្រណីតរបស់យើង — ពីបដារហូតដល់នាមប័ណ្ណ។",
    exploreOptions: "ស្វែងរកជម្រើស →",
    contactSupport: "ទំនាក់ទំនងការគាំទ្រ",
    quoteTitle: "ត្រូវការតម្លៃផ្ទាល់ខ្លួន?",
    quoteSub:
      "រក​មិន​ឃើញ​អ្វី​ដែល​អ្នក​ចង់​បាន? យើង​ដោះស្រាយ​គម្រោង​ផ្ទាល់ខ្លួន​គ្រប់​ទំហំ។",
    signIn: "ចូល",
    getStarted: "ចាប់ផ្ដើម",
    nav: {
      products: "ផលិតផល",
      gallery: "វិចិត្រសាល",
      pricing: "តម្លៃ",
      about: "អំពីយើង",
    },
    cats: ["បដា", "រទេះ", "នាមប័ណ្ណ", "ផូស្ទែរ", "ត្រាចែកចាយ"],
  },
  en: {
    eyebrow: "Inspiration Gallery",
    heroTitle: "Discover printing solutions for your",
    heroEm: "next big project",
    heroSub:
      "Browse our curated collection of premium print products — from banners to business cards.",
    exploreOptions: "Explore options →",
    contactSupport: "Contact Support",
    quoteTitle: "Need a Custom Quote?",
    quoteSub:
      "Can't find what you're looking for? We handle custom projects of all sizes.",
    signIn: "Sign in",
    getStarted: "Get Started",
    nav: {
      products: "Products",
      gallery: "Gallery",
      pricing: "Pricing",
      about: "About",
    },
    cats: ["Banners", "Carts", "Business Cards", "Posters", "Flyers"],
  },
  zh: {
    eyebrow: "灵感画廊",
    heroTitle: "发现适合您的印刷解决方案",
    heroEm: "下一个大项目",
    heroSub: "浏览我们精心策划的优质印刷产品系列——从横幅到名片。",
    exploreOptions: "探索选项 →",
    contactSupport: "联系支持",
    quoteTitle: "需要定制报价？",
    quoteSub: "找不到您需要的产品？我们承接各种规模的定制项目。",
    signIn: "登录",
    getStarted: "开始使用",
    nav: {
      products: "产品",
      gallery: "画廊",
      pricing: "定价",
      about: "关于我们",
    },
    cats: ["横幅", "货车", "名片", "海报", "传单"],
  },
};

const categories = ["Banners", "Carts", "Business Cards", "Posters", "Flyers"];

// --- Product Data ---
export const products = [
  {
    id: 1,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    title: "Vinyl Outdoor Banners",
    subtitle: "Weather-resistant printing solutions",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
    category: "Banners",
  },
  {
    id: 2,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    title: "Roll-Up Banners",
    subtitle: "Portable displays for events & trade shows",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    category: "Banners",
  },
  {
    id: 101,
    tag: "STANDING",
    tagColor: "#0ea5e9",
    title: "Exhibition Cart A",
    subtitle: "Vertical display cart for events",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    category: "Carts",
  },
  {
    id: 103,
    tag: "LYING DOWN",
    tagColor: "#6366f1",
    title: "Flatbed Display Cart",
    subtitle: "Horizontal merchandise display",
    image:
      "https://images.unsplash.com/photo-1540340334550-624b39d67565?w=600&q=80",
    category: "Carts",
  },
  {
    id: 3,
    tag: "PREMIUM",
    tagColor: "#f59e0b",
    title: "Premium Business Cards",
    subtitle: "Luxury finishes and Matte/Gloss Stock",
    image:
      "https://images.unsplash.com/photo-1586282023338-52aa31c63327?w=600&q=80",
    category: "Business Cards",
  },
  {
    id: 4,
    tag: "NEW",
    tagColor: "#ef4444",
    title: "Event Posters",
    subtitle: "Vibrant colors and sharp details",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&q=80",
    category: "Posters",
  },
  {
    id: 5,
    tag: "TRENDING",
    tagColor: "#06b6d4",
    title: "Promotional Flyers",
    subtitle: "Bold designs for maximum impact",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Flyers",
  },
];

export default function InspirationGallery() {
  const navigate = useNavigate();

  // 2. Use Global Language instead of local useState
  const { lang, setLang } = useLanguage();

  const [langOpen, setLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang];
  const currentLang = languages.find((l) => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter products based on active tab
  const filtered = products.filter(
    (p) => p.category === categories[activeCategory],
  );

  return (
    <div>
      <style>{`
        /* Import your styles here or use a separate CSS file */
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #f7f6f3; --surface: #ffffff; --surface2: #f0ede8;
          --text: #1a1714; --text-muted: #7a746e; --accent: #0ea5e9;
          --accent-dark: #0284c7; --border: #e5e0d8; --radius: 16px;
        }
        body { font-family: 'Satoshi', sans-serif; background: var(--bg); color: var(--text); }
        .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,246,243,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 clamp(1rem, 5vw, 4rem); }
        .nav-inner { max-width: 1280px; margin: 0 auto; height: 68px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 0.5rem; font-family: 'Clash Display', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text); text-decoration: none; }
        .nav-logo-dot { width: 28px; height: 28px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { font-size: 0.9rem; font-weight: 500; color: var(--text-muted); text-decoration: none; }
        .nav-actions { display: flex; align-items: center; gap: 0.75rem; }
        .btn-ghost { padding: 0.45rem 1rem; border: 1px solid var(--border); border-radius: 8px; background: transparent; cursor: pointer; }
        .btn-primary { padding: 0.45rem 1.1rem; border: none; border-radius: 8px; background: var(--accent); color: #fff; font-weight: 600; cursor: pointer; }
        .hero { padding: 4rem clamp(1rem, 5vw, 4rem) 0; max-width: 1280px; margin: 0 auto; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 0.4rem; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; padding: 0.3rem 0.9rem; font-size: 0.78rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.25rem; }
        .hero-title { font-family: 'Clash Display', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; margin-bottom: 0.75rem; }
        .hero-title em { font-style: normal; color: var(--accent); }
        .tabs-wrapper { padding: 2rem clamp(1rem, 5vw, 4rem) 0; max-width: 1280px; margin: 0 auto; }
        .tabs-scroll { display: flex; gap: 0.5rem; overflow-x: auto; scrollbar-width: none; }
        .tab-btn { flex-shrink: 0; padding: 0.5rem 1.25rem; border-radius: 100px; border: 1.5px solid var(--border); background: var(--surface); cursor: pointer; white-space: nowrap; }
        .tab-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
        .grid-wrapper { padding: 2rem clamp(1rem, 5vw, 4rem); max-width: 1280px; margin: 0 auto; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
        .card { background: var(--surface); border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); cursor: pointer; transition: transform 0.3s ease; }
        .card:hover { transform: translateY(-6px); }
        .card-img-wrap { height: 200px; position: relative; }
        .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .card-tag { position: absolute; top: 12px; left: 12px; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.7rem; font-weight: 700; color: #fff; }
        .card-body { padding: 1.25rem; }
        .card-title { font-weight: 600; margin-bottom: 0.25rem; }
        .card-sub { font-size: 0.825rem; color: var(--text-muted); }
        .quote-banner { padding: 0 clamp(1rem, 5vw, 4rem) 4rem; max-width: 1280px; margin: 0 auto; }
        .quote-inner { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 3rem; display: flex; align-items: center; justify-content: space-between; }
        .lang-switcher { position: relative; }
        .lang-btn { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border); border-radius: 8px; background: #fff; cursor: pointer; }
        .lang-dropdown { position: absolute; top: 110%; right: 0; min-width: 160px; background: #fff; border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); z-index: 200; }
        .lang-option { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem; width: 100%; border: none; background: none; cursor: pointer; text-align: left; }
        .lang-option:hover { background: var(--surface2); }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span>✦</span> {tx.eyebrow}
        </div>
        <h1 className="hero-title">
          {tx.heroTitle} <em>{tx.heroEm}</em>
        </h1>
        <p className="hero-sub">{tx.heroSub}</p>
      </section>

      {/* CATEGORY TABS */}
      <div className="tabs-wrapper">
        <div className="tabs-scroll">
          {tx.cats.map((cat, i) => (
            <button
              key={i}
              className={`tab-btn ${activeCategory === i ? "active" : ""}`}
              onClick={() => setActiveCategory(i)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid-wrapper">
        <div className="products-grid">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => navigate(`/detail/${product.id}`)}
            >
              <div className="card-img-wrap">
                <img src={product.image} alt={product.title} />
                <span
                  className="card-tag"
                  style={{ background: product.tagColor }}
                >
                  {product.tag}
                </span>
              </div>
              <div className="card-body">
                <div className="card-title">{product.title}</div>
                <div className="card-sub">{product.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUOTE BANNER */}
      <div className="quote-banner">
        <div className="quote-inner">
          <div className="quote-text">
            <h3>{tx.quoteTitle}</h3>
            <p>{tx.quoteSub}</p>
          </div>
          <button className="btn-support">{tx.contactSupport}</button>
        </div>
      </div>
    </div>
  );
}
