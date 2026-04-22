import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Loader2 } from "lucide-react"; // Loader2 is now used below
import { useLanguage } from "../../context/LanguageContext";
import { t as translationData } from "../../locales/translateDetail";

const API_BASE_URL = "http://localhost:8081";

export default function BannerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use a type cast to ensure TypeScript knows these properties exist
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
        <Loader2 className="animate-spin text-blue-600" />{" "}
        {/* Fixed unused variable error */}
        <span className={lang === "km" ? "font-km" : ""}>
          {tx.detail.loading}
        </span>
      </div>
    );

  if (!product) return <div>{tx.detail.notFound}</div>;

  // Use the ID as a string to match our translateDetail file
  const productOverride = tx.products?.[id as string];

  const displayTitle = productOverride?.title || product?.name;
  const displaySub = productOverride?.sub || product?.title;
  const displayDesc = productOverride?.desc || product?.description;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 font-bold ${lang === "km" ? "font-km text-gray-500" : "text-gray-500"}`}
        >
          <ChevronLeft size={20} /> {tx.detail.back} {/* Error fixed here */}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
        <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-50">
          <img
            src={`${API_BASE_URL}${product.imageUrl}`}
            className="w-full object-cover"
            alt={displayTitle}
          />
        </div>
        <div>
          <p className="text-blue-600 font-bold uppercase tracking-widest">
            {displaySub}
          </p>
          <h1
            className={`text-gray-900 leading-tight mb-6 ${lang === "km" ? "text-4xl font-km font-bold" : "text-6xl font-black"}`}
          >
            {displayTitle}
          </h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl font-black text-blue-600">
              ${product.price?.toFixed(2)}
            </span>
            <span
              className={`px-4 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {product.stock > 0 ? tx.detail.inStock : tx.detail.outOfStock}{" "}
              {/* Errors fixed here */}
            </span>
          </div>
          <div className="border-t pt-8">
            <h3
              className={`text-xl font-bold mb-4 ${lang === "km" ? "font-km" : ""}`}
            >
              {tx.detail.detailsTitle}
            </h3>{" "}
            {/* Error fixed here */}
            <p
              className={`text-gray-600 leading-relaxed whitespace-pre-wrap ${lang === "km" ? "font-km text-lg" : "text-lg"}`}
            >
              {displayDesc}
            </p>
          </div>
          <button className="mt-12 w-full lg:w-max bg-blue-600 text-white px-16 py-5 rounded-2xl font-bold flex items-center justify-center gap-4 active:scale-95 transition-all">
            <ShoppingCart size={24} />
            <span className={lang === "km" ? "font-km text-xl" : "text-lg"}>
              {tx.detail.addToCart} {/* Error fixed here */}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
