import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Loader2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { t, type ProductOverride } from "../../locales/translations";

const API_BASE_URL = "http://localhost:8081";

export default function BannerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use type assertion for better IntelliSense
  const tx = t[lang as keyof typeof t] || t.en;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/product-details/${id}`,
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center gap-2 bg-white font-km">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <span className="font-medium text-gray-500">{tx.loading}</span>
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white font-km">
        <h2 className="text-xl font-bold text-gray-800">{tx.notFound}</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 font-bold hover:underline"
        >
          {tx.back}
        </button>
      </div>
    );

  // Mapping override data based on Product ID
  const overrides = tx.productOverrides as Record<number, ProductOverride>;
  const override = overrides?.[Number(product.productId)];

  const displayTitle = override?.title || product.name;
  const displaySub = override?.sub || product.title;
  const displayDesc = override?.desc || product.description;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 font-bold hover:text-blue-600 transition-all group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {tx.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
        <div className="relative group">
          <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50 bg-gray-50 aspect-square flex items-center justify-center">
            <img
              src={`${API_BASE_URL}${product.imageUrl}`}
              alt={displayTitle}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
            {displaySub}
          </p>

          <h1
            className={`text-gray-900 leading-[1.1] mb-6 ${
              lang === "km"
                ? "text-3xl md:text-5xl font-bold"
                : "text-4xl md:text-6xl font-black tracking-tight"
            }`}
          >
            {displayTitle}
          </h1>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-4xl md:text-5xl font-black text-blue-600">
              ${product.price?.toFixed(2)}
            </span>
            <span
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              {tx.details}
            </h3>
            <p
              className={`text-gray-600 leading-relaxed whitespace-pre-wrap ${
                lang === "km"
                  ? "text-lg md:text-xl font-km"
                  : "text-base md:text-lg"
              }`}
            >
              {displayDesc}
            </p>
          </div>

          <button className="mt-12 w-full lg:w-max bg-blue-600 hover:bg-blue-700 text-white px-16 py-5 rounded-2xl font-bold flex items-center justify-center gap-4 shadow-xl shadow-blue-100 active:scale-95 transition-all group">
            <ShoppingCart
              size={24}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className={lang === "km" ? "text-xl font-km" : "text-lg"}>
              {tx.addToCart}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
