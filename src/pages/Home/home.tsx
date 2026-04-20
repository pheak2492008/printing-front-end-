import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import Partner from "./partner";
import Reviews from "./reviwe";

/* 1. CONFIGURATION */
const API_BASE_URL = "http://localhost:8081";
// Mapping buttons to your Database productId (1: Banners, 2: Stickers, 3: Logos)
const categoryIdMap = [1, 2, 3];

/* 2. TRANSLATIONS (Simplified for space) */
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
  const [products, setProducts] = useState<any[]>([]); // Data from Backend
  const [loading, setLoading] = useState(true);

  const tx = t[lang as keyof typeof t] || t.en;

  /* 3. FETCH DATA FROM BACKEND */
  useEffect(() => {
    setLoading(true);
    const categoryId = categoryIdMap[activeCategory];

    // Using your custom API endpoint
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
  }, [activeCategory]); // Re-fetch whenever user clicks a new button

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

        {/* Product Cards */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/detail/${product.id}`)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-[220px] bg-gray-100">
                  {/* Dynamic Image URL from Backend */}
                  <img
                    src={`${API_BASE_URL}${product.imageUrl}`}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white px-3 py-1 rounded-full bg-blue-600">
                    {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700">
                      {tx.learnMore}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* If the category is empty in DB */}
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
