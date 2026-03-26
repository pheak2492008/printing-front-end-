import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type LangKey = "en" | "zh" | "km";

const languages: { code: LangKey; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "km", label: "ខ្មែរ", flag: "🇰🇭" },
];

const t: Record<
  LangKey,
  {
    eyebrow: string;
    heroTitle: string;
    heroEm: string;
    heroSub: string;
    exploreOptions: string;
    contactSupport: string;
    quoteTitle: string;
    quoteSub: string;
    signIn: string;
    getStarted: string;
    nav: { products: string; gallery: string; pricing: string; about: string };
    cats: string[];
  }
> = {
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
    cats: ["Banners", "Stickers", "Business Cards", "Posters", "Flyers"],
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
    cats: ["横幅", "贴纸", "名片", "海报", "传单"],
  },
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
    cats: ["បដា", "ស្ទីករ", "នាមប័ណ្ណ", "ផូស្ទែរ", "ត្រាចែកចាយ"],
  },
};

const categories = [
  "Banners",
  "Stickers",
  "Business Cards",
  "Posters",
  "Flyers",
];

export const products = [
  {
    id: 1,
    tag: "BESTSELLER",
    tagColor: "bg-emerald-500",
    title: "Vinyl Outdoor Banners",
    subtitle: "Weather-resistant printing solutions",
    image:
      "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
    category: "Banners",
  },
  {
    id: 2,
    tag: "POPULAR",
    tagColor: "#6366f1",
    title: "Branding Stickers",
    subtitle: "Custom die-cut stickers for Glass",
    image:
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&q=80",
    category: "Stickers",
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
  {
    id: 6,
    tag: "BESTSELLER",
    tagColor: "#10b981",
    title: "Roll-Up Banners",
    subtitle: "Portable displays for events & trade shows",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    category: "Banners",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f6f3;
    --surface: #ffffff;
    --surface2: #f0ede8;
    --text: #1a1714;
    --text-muted: #7a746e;
    --accent: #0ea5e9;
    --accent-dark: #0284c7;
    --border: #e5e0d8;
    --radius: 16px;
    --shadow-hover: 0 12px 40px rgba(0,0,0,0.15);
  }

  body {
    font-family: 'Satoshi', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(247,246,243,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 clamp(1rem, 5vw, 4rem);
  }
  .nav-inner {
    max-width: 1280px; margin: 0 auto; height: 68px;
    display: flex; align-items: center; justify-content: space-between; gap: 2rem;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 0.5rem;
    font-family: 'Clash Display', sans-serif; font-size: 1.25rem; font-weight: 700;
    color: var(--text); text-decoration: none;
  }
  .nav-logo-dot {
    width: 28px; height: 28px; background: var(--accent); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { font-size: 0.9rem; font-weight: 500; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--text); }
  .nav-actions { display: flex; align-items: center; gap: 0.75rem; }
  .btn-ghost {
    padding: 0.45rem 1rem; border: 1px solid var(--border); border-radius: 8px;
    background: transparent; font-family: 'Satoshi', sans-serif; font-size: 0.875rem;
    font-weight: 500; color: var(--text); cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { background: var(--surface2); }
  .btn-primary {
    padding: 0.45rem 1.1rem; border: none; border-radius: 8px;
    background: var(--accent); color: #fff; font-family: 'Satoshi', sans-serif;
    font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--accent-dark); }
  .nav-mobile-btn {
    display: none; padding: 0.4rem; background: none;
    border: 1px solid var(--border); border-radius: 8px; cursor: pointer; color: var(--text);
  }

  .hero {
    padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 4rem) 0;
    max-width: 1280px; margin: 0 auto;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: var(--surface); border: 1px solid var(--border); border-radius: 100px;
    padding: 0.3rem 0.9rem; font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 1.25rem;
  }
  .hero-eyebrow span { color: var(--accent); }
  .hero-title {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700;
    line-height: 1.1; letter-spacing: -0.02em; max-width: 640px; margin-bottom: 0.75rem;
  }
  .hero-title em { font-style: normal; color: var(--accent); }
  .hero-sub {
    font-size: clamp(0.95rem, 2vw, 1.1rem); color: var(--text-muted);
    max-width: 480px; line-height: 1.6;
  }

  .tabs-wrapper { padding: 2rem clamp(1rem, 5vw, 4rem) 0; max-width: 1280px; margin: 0 auto; }
  .tabs-scroll {
    display: flex; gap: 0.5rem; overflow-x: auto;
    padding-bottom: 0.25rem; scrollbar-width: none;
  }
  .tabs-scroll::-webkit-scrollbar { display: none; }
  .tab-btn {
    flex-shrink: 0; padding: 0.5rem 1.25rem; border-radius: 100px;
    border: 1.5px solid var(--border); background: var(--surface);
    font-family: 'Satoshi', sans-serif; font-size: 0.875rem; font-weight: 500;
    color: var(--text-muted); cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .tab-btn:hover { border-color: var(--accent); color: var(--accent); }
  .tab-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; font-weight: 600; }

  .grid-wrapper { padding: 2rem clamp(1rem, 5vw, 4rem); max-width: 1280px; margin: 0 auto; }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .card {
    background: var(--surface); border-radius: var(--radius);
    overflow: hidden; border: 1px solid var(--border); cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
    position: relative;
    animation: fadeUp 0.4s ease both;
  }
  .card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
  .card-img-wrap {
    position: relative; height: 200px; overflow: hidden; background: var(--surface2);
  }
  .card-img-wrap img {
    width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;
  }
  .card:hover .card-img-wrap img { transform: scale(1.06); }
  .card-tag {
    position: absolute; top: 12px; left: 12px;
    padding: 0.25rem 0.6rem; border-radius: 6px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; color: #fff;
  }
  .card-arrow {
    position: absolute; bottom: 12px; right: 12px;
    width: 32px; height: 32px; background: rgba(255,255,255,0.9);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: translateY(4px); transition: all 0.25s ease;
  }
  .card:hover .card-arrow { opacity: 1; transform: translateY(0); }
  .card-body { padding: 1.1rem 1.25rem 1.25rem; }
  .card-title {
    font-family: 'Clash Display', sans-serif; font-size: 1rem;
    font-weight: 600; margin-bottom: 0.25rem; color: var(--text);
  }
  .card-sub { font-size: 0.825rem; color: var(--text-muted); line-height: 1.4; }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 0.9rem; padding-top: 0.9rem; border-top: 1px solid var(--border);
  }
  .card-cta { font-size: 0.8rem; font-weight: 600; color: var(--accent); }
  .card-icon { width: 20px; height: 20px; color: var(--text-muted); }

  .quote-banner { padding: 0 clamp(1rem, 5vw, 4rem) 4rem; max-width: 1280px; margin: 0 auto; }
  .quote-inner {
    background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
    padding: clamp(2rem, 5vw, 3rem);
    display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap;
  }
  .quote-text h3 {
    font-family: 'Clash Display', sans-serif;
    font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 700; margin-bottom: 0.4rem;
  }
  .quote-text p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; }
  .btn-support {
    flex-shrink: 0; padding: 0.75rem 1.75rem; background: var(--accent); color: #fff;
    border: none; border-radius: 12px; font-family: 'Satoshi', sans-serif;
    font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.2s;
  }
  .btn-support:hover { background: var(--accent-dark); transform: scale(1.03); }

  /* ── LANGUAGE SWITCHER ── */
  .lang-switcher { position: relative; }
  .lang-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.4rem 0.75rem; border: 1px solid var(--border); border-radius: 8px;
    background: var(--surface); font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem; font-weight: 500; color: var(--text);
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .lang-btn:hover { background: var(--surface2); border-color: var(--accent); }
  .lang-btn svg { transition: transform 0.2s; }
  .lang-btn.open svg { transform: rotate(180deg); }
  .lang-dropdown {
    position: absolute; top: calc(100% + 8px); right: 0;
    min-width: 160px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    overflow: hidden; z-index: 200;
    animation: dropIn 0.18s ease;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .lang-option {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.6rem 1rem; width: 100%; border: none;
    background: none; font-family: 'Satoshi', sans-serif;
    font-size: 0.875rem; font-weight: 500; color: var(--text);
    cursor: pointer; transition: background 0.15s; text-align: left;
  }
  .lang-option:hover { background: var(--surface2); }
  .lang-option.selected { color: var(--accent); font-weight: 700; }
  .lang-option.selected::after { content: "✓"; margin-left: auto; font-size: 0.75rem; }

  @media (max-width: 768px) {
    .nav-links, .nav-actions .btn-ghost { display: none; }
    .nav-mobile-btn { display: flex; align-items: center; justify-content: center; }
    .products-grid { grid-template-columns: repeat(2, 1fr); gap: 0.875rem; }
    .card-img-wrap { height: 160px; }
    .quote-inner { flex-direction: column; text-align: center; }
    .btn-support { width: 100%; }
  }
  @media (max-width: 480px) {
    .products-grid { grid-template-columns: 1fr; }
    .card-img-wrap { height: 200px; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card:nth-child(1) { animation-delay: 0.05s; }
  .card:nth-child(2) { animation-delay: 0.10s; }
  .card:nth-child(3) { animation-delay: 0.15s; }
  .card:nth-child(4) { animation-delay: 0.20s; }
  .card:nth-child(5) { animation-delay: 0.25s; }
  .card:nth-child(6) { animation-delay: 0.30s; }
`;

export default function InspirationGallery() {
  const navigate = useNavigate();
  const [lang, setLang] = useState<LangKey>("en");
  const [langOpen, setLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang];
  const currentLang = languages.find((l) => l.code === lang)!;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Reset active category when language changes
  useEffect(() => {
    setActiveCategory(0);
  }, [lang]);

  const filtered = products.filter(
    (p) => p.category === categories[activeCategory],
  );

  return (
    <div>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a className="nav-logo" href="#">
            <div className="nav-logo-dot">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            PrintCraft
          </a>
          <ul className="nav-links">
            <li>
              <a href="#">{tx.nav.products}</a>
            </li>
            <li>
              <a href="#">{tx.nav.gallery}</a>
            </li>
            <li>
              <a href="#">{tx.nav.pricing}</a>
            </li>
            <li>
              <a href="#">{tx.nav.about}</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button className="btn-ghost">{tx.signIn}</button>

            {/* LANGUAGE SWITCHER */}
            <div className="lang-switcher" ref={langRef}>
              <button
                className={`lang-btn${langOpen ? " open" : ""}`}
                onClick={() => setLangOpen((v) => !v)}
                aria-label="Switch language"
              >
                <span className="lang-flag">{currentLang.flag}</span>
                <span>{currentLang.label}</span>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {langOpen && (
                <div className="lang-dropdown">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      className={`lang-option${lang === l.code ? " selected" : ""}`}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="btn-primary">{tx.getStarted}</button>
            <button className="nav-mobile-btn" aria-label="Menu">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span>✦</span> {tx.eyebrow}
        </div>
        <h1 className="hero-title">
          {tx.heroTitle} <em>{tx.heroEm}</em>
        </h1>
        <p className="hero-sub">{tx.heroSub}</p>
      </section>

      {/* TABS */}
      <div className="tabs-wrapper">
        <div className="tabs-scroll">
          {tx.cats.map((cat: string, i: number) => (
            <button
              key={i}
              className={`tab-btn${activeCategory === i ? " active" : ""}`}
              onClick={() => setActiveCategory(i)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID - This is where the connection happens */}
      <div className="grid-wrapper">
        <div className="products-grid" key={`${lang}-${activeCategory}`}>
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card"
              onClick={() => navigate(`/detail/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-img-wrap">
                <img src={product.image} alt={product.title} loading="lazy" />
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
                <div className="card-footer">
                  <span className="card-cta">{tx.exploreOptions}</span>
                </div>
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
