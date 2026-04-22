import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ShoppingCart,
  Loader2,
  Maximize2,
  X,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { t as translationData } from "../../locales/translateDetail";

const API_BASE_URL = "http://localhost:8081";

export default function BannerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Type-safe translation access
  const tx = (translationData[lang as keyof typeof translationData] ||
    translationData.en) as any;

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center gap-2">
        <Loader2 className="animate-spin text-blue-600" />
        <span className={lang === "km" ? "font-km" : ""}>
          {tx.detail?.loading}
        </span>
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        {tx.detail?.notFound}
      </div>
    );

  // Match ID from translateDetail.ts
  const productOverride = tx.products?.[id as string];

  const displayTitle = productOverride?.title || product?.name;
  const displaySub = productOverride?.sub || product?.title;
  const displayDesc = productOverride?.desc || product?.description;
  const productImage = `${API_BASE_URL}${product.imageUrl}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button Container */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 font-bold transition-colors hover:text-blue-600 ${lang === "km" ? "font-km text-gray-500" : "text-gray-500"}`}
        >
          <ChevronLeft size={20} /> {tx.detail?.back}
        </button>
      </div>

      {/* Main Grid: max-w-6xl narrows the page correctly */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 pb-24 items-start">
        {/* Left: Clickable Product Image */}
        <div className="relative group max-w-sm mx-auto md:max-w-none w-full">
          <div
            onClick={() => setIsImageModalOpen(true)}
            className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-gray-50 bg-gray-50 aspect-[4/5] flex items-center justify-center cursor-zoom-in group transition-all duration-300 hover:shadow-blue-100"
          >
            <img
              src={productImage}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              alt={displayTitle}
            />
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <Maximize2 size={20} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Right: Content Details */}
        <div className="flex flex-col">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">
            {displaySub}
          </p>
          <h1
            className={`text-gray-900 leading-tight mb-6 ${lang === "km" ? "text-4xl font-km font-bold" : "text-5xl font-black tracking-tight"}`}
          >
            {displayTitle}
          </h1>

          <div className="flex items-center gap-5 mb-8">
            <span className="text-5xl font-black text-blue-600">
              ${product.price?.toFixed(2)}
            </span>
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {product.stock > 0 ? tx.detail?.inStock : tx.detail?.outOfStock}
            </span>
          </div>

          {/* Description Section */}
          <div className="border-t pt-8">
            <h3
              className={`text-xl font-bold mb-4 ${lang === "km" ? "font-km" : ""}`}
            >
              {tx.detail?.detailsTitle}
            </h3>
            <p
              className={`text-gray-600 leading-relaxed whitespace-pre-wrap ${lang === "km" ? "font-km text-lg" : "text-lg"}`}
            >
              {displayDesc}
            </p>
          </div>

          {/* New Specifications Grid */}
          <div className="mt-10">
            <h3
              className={`text-lg font-bold mb-5 ${lang === "km" ? "font-km" : ""}`}
            >
              {tx.detail?.specsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productOverride?.specs?.map((spec: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100"
                >
                  <CheckCircle2 size={18} className="text-blue-500" />
                  <span
                    className={`text-gray-700 ${lang === "km" ? "font-km" : "text-sm font-semibold"}`}
                  >
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-12 w-full bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl shadow-blue-100 hover:bg-blue-700">
            <ShoppingCart size={24} />
            <span className={lang === "km" ? "font-km text-xl" : "text-lg"}>
              {tx.detail?.addToCart}
            </span>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal Portal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20">
            <X size={28} />
          </button>
          <img
            src={productImage}
            className="max-w-full max-h-full rounded-xl shadow-2xl animate-in zoom-in duration-300"
            alt="Full"
          />
        </div>
      )}
    </div>
  );
}
