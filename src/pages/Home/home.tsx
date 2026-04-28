import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Partner from "./partner";
import Reviews from "./reviwe";

/* 1. CONFIGURATION */
// Uses the variable from your .env file, or defaults to localhost for safety
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";
const categoryIdMap = [1, 2, 3];

/* 2. TRANSLATIONS */
const t = {
  km: {
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    heroSub: "រកមើលបណ្តុំផលិតផលបោះពុម្ពប្រណីតរបស់យើង — ពីបដារហូតដល់នាមប័ណ្ណ។",
    getStarted: "ចាប់ផ្តើម",
    popularProducts: "ផលិតផលបោះពុម្ពពេញនិយម",
    popularSub: "រកមើលផលិតផលបោះពុម្ពដ៏ល្អបំផុតរបស់យើង",
    cats: ["បោះពុម្ព Banner", "បោះពុម្ព Stickers", "បោះពុម្ព Sticker Logos"],
    learnMore: "ស្វែងយល់បន្ថែម",
    serverWaking:
      "ម៉ាស៊ីនមេកំពុងដំណើរការ... សូមរង់ចាំបន្តិច (ប្រហែល ៣០ វិនាទី)",
  },
  en: {
    heroTitle: "Discover professional printing solutions for your",
    heroEm: "next big project",
    heroSub: "Browse our curated collection of premium print products.",
    getStarted: "Get Started",
    popularProducts: "Popular Print Products",
    popularSub: "Explore our best-selling print items",
    cats: ["Print Banners", "Print Stickers", "Print Sticker Logos"],
    learnMore: "Learn More",
    serverWaking: "Server is waking up... Please wait (approx. 30s)",
  },
  zh: {
    heroTitle: "为您的下一个大项目发现",
    heroEm: "专业的印刷解决方案",
    heroSub: "浏览我们精心挑选的优质印刷产品系列。",
    getStarted: "立即开始",
    popularProducts: "热门印刷产品",
    popularSub: "探索我们最畅销的印刷项目",
    cats: ["横幅印刷", "贴纸印刷", "标志贴纸印刷"],
    learnMore: "了解更多",
    serverWaking: "服务器正在启动... 请稍候（约 30 秒）",
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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = parseInt(searchParams.get("cat") || "0");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tx = (t as any)[lang] || t.en;

  /* 3. FETCH DATA */
  useEffect(() => {
    const categoryId = categoryIdMap[activeCategory];
    setLoading(true);
    setError(null);

    // Using fetch with the dynamic API_BASE_URL
    fetch(`${API_BASE_URL}/api/v1/products/category/${categoryId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with error");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [activeCategory]);

  const handleCategoryChange = (index: number) => {
    setSearchParams({ cat: index.toString() });
  };

  /* Helper function to handle local vs Cloudinary images */
  const getImageUrl = (url: string) => {
    if (!url) return "https://via.placeholder.com/400x300?text=No+Image";

    // If it starts with /uploads, we MUST add the backend URL
    if (url.startsWith("/uploads")) {
      return `${API_BASE_URL}${url}`;
    }

    return url; // Return as is if it's already a full Cloudinary link
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Marquee Strip */}
      <div className="w-full overflow-hidden border-b border-white/5 shadow-sm bg-[#0f172a]">
        <div
          className="flex py-4 whitespace-nowrap animate-marquee"
          style={{ width: "max-content", gap: "8rem" }}
        >
          {[...marqueeLogos, ...marqueeLogos].map((name, i) => (
            <span
              key={i}
              className="text-white/40 font-bold text-[15px] uppercase tracking-[0.25em] px-4"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-[#1e293b] text-white py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              {tx.heroTitle} <br />
              <span className="text-blue-400">{tx.heroEm}</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">{tx.heroSub}</p>
            <Link
              to="/order"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-bold transition-all inline-block hover:scale-105 active:scale-95"
            >
              {tx.getStarted}
            </Link>
          </div>
          <div className="w-full md:w-112.5 h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800"
              className="w-full h-full object-cover"
              alt="Printing"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {tx.popularProducts}
          </h2>
          <p className="text-gray-500 mt-2">{tx.popularSub}</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto mb-10 justify-center no-scrollbar pb-2">
          {tx.cats.map((cat: string, i: number) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(i)}
              className={`px-6 py-2 rounded-full border font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === i
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid / Loading / Error States */}
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 font-medium">{tx.serverWaking}</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 underline"
            >
              Retry connection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/detail/${product.id}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-60 bg-gray-50 overflow-hidden">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-bold text-white px-3 py-1 rounded-full shadow-md ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className={`font-bold text-lg text-gray-900 mb-2 ${lang === "km" ? "font-km" : ""}`}
                  >
                    {product.name || product.title}
                  </h3>
                  <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-blue-600 font-black text-2xl">
                      ${product.price?.toFixed(2)}
                    </span>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm">
                      {tx.learnMore}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No products found.
          </div>
        )}
      </section>

      <Reviews />
      <Partner />

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
