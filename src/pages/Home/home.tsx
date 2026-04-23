import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Partner from "./partner";
import Reviews from "./reviwe";

/* 1. CONFIGURATION */
const API_BASE_URL = "http://localhost:8081";
const categoryIdMap = [1, 2, 3];

/* 2. TRANSLATIONS WITH PRODUCT OVERRIDES */
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
    productTitles: {
      1: {
        title: "បដា Vinyl ខាងក្រៅ",
        sub: "ដំណោះស្រាយបោះពុម្ពធន់នឹងអាកាសធាតុ",
      },
      2: {
        title: "ស្ទីគ័រ កាត់តាមរាង",
        sub: "ស្ទីគ័រមិនជ្រាបទឹក និងការពារកាំរស្មីយូវី",
      },
      3: {
        title: "ឡូហ្គោ ស្ទីគ័រម៉ាក",
        sub: "សម្រាប់វេចខ្ចប់ និងបិទស្លាកផលិតផល",
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
    learnMore: "Learn More",
    productTitles: {},
  },
  zh: {
    heroTitle: "为您的下一个大项目发现",
    heroEm: "专业的印刷解决方案",
    heroSub: "浏览我们精心挑选的优质印刷产品系列——从横幅到名片。",
    getStarted: "立即开始",
    popularProducts: "热门印刷产品",
    popularSub: "探索我们最畅销的印刷项目",
    cats: ["横幅印刷", "贴纸印刷", "标志贴纸印刷"],
    learnMore: "了解更多",
    productTitles: {
      1: { title: "乙烯基户外横幅", sub: "高品质、耐用的户外广告横幅。" },
      2: { title: "定制模切贴纸", sub: "防水防紫外线定制形状贴纸。" },
      3: { title: "品牌标志贴纸", sub: "用于包装和产品标签的预切贴纸。" },
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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tx = t[lang as keyof typeof t] || t.en;

  /* 3. FETCH DATA FROM BACKEND */
  useEffect(() => {
    setLoading(true);
    const categoryId = categoryIdMap[activeCategory];

    fetch(`${API_BASE_URL}/api/v1/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* SLIM MARQUEE STRIP 
          - Changed py-4 to py-2 (matches your screenshot)
          - Doubled the map for a seamless infinite loop
          - Increased gap for "running away" effect
      */}
      <div
        className="w-full overflow-hidden border-b border-white/5 shadow-sm"
        style={{ background: "linear-gradient(90deg,#0f172a,#1e3a5f,#0f172a)" }}
      >
        <div
          className="flex py-4 whitespace-nowrap"
          style={{
            animation: "marquee 35s linear infinite",
            width: "max-content",
            gap: "8rem", // Significant space between items
          }}
        >
          {/* Mapping twice allows for a smooth loop with translateX(-50%) */}
          {[...marqueeLogos, ...marqueeLogos].map((name, i) => (
            <span
              key={i}
              className="text-white/40 font-bold text-[15px] uppercase tracking-[0.25em] px-4"
            >
              {name}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-[#1e293b] text-white py-14">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              {tx.heroTitle} <br />
              <span className="text-blue-400">{tx.heroEm}</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8">{tx.heroSub}</p>
            <Link
              to="/order"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-bold transition-colors inline-block"
            >
              {tx.getStarted}
            </Link>
          </div>
          <div className="w-full md:w-[450px] h-[320px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
              className="w-full h-full object-cover"
              alt="Hero Banner"
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
              className={`px-6 py-2 rounded-full border font-semibold text-sm transition-all whitespace-nowrap ${
                activeCategory === i
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              // @ts-ignore
              const localTx = tx.productTitles?.[product.productId];

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/detail/${product.id}`)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-[240px] bg-gray-50 overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${product.imageUrl}`}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-bold text-white px-3 py-1 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                      >
                        {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {localTx ? localTx.title : product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
                      {localTx ? localTx.sub : product.description}
                    </p>
                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-blue-600 font-bold text-xl">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors">
                        {tx.learnMore}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No products found in this category.
          </div>
        )}
      </section>

      <Reviews />
      <Partner />
    </div>
  );
}
