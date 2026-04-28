import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

/* 1. CONFIGURATION - Use your ENV variable here */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function HomeReviews() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<any[]>([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });

  useEffect(() => {
    // 2. UPDATED: Fetch using API_BASE_URL
    fetch(`${API_BASE_URL}/api/v1/reviews/summary`)
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Stats fetch failed", err));

    // 3. UPDATED: Fetch using API_BASE_URL
    fetch(`${API_BASE_URL}/api/v1/reviews/all`)
      .then((res) => res.json())
      .then(setReviews)
      .catch((err) => console.error("Reviews fetch failed", err));
  }, []);

  const tx = {
    km: {
      heroTitle: "សំឡេងរបស់អតិថិជនយើង",
      heroDesc: "មតិកែលម្អរបស់អ្នកជួយយើងឱ្យកាន់តែប្រសើរឡើង។",
      avg: "ការវាយតម្លៃមធ្យម",
      total: "មតិសរុប",
      btn: "មើលមតិទាំងអស់ & សរសេរមតិ",
    },
    en: {
      heroTitle: "Our Customer Voices",
      heroDesc: "Your feedback helps us grow and improve.",
      avg: "Average Rating",
      total: "Total Reviews",
      btn: "View All & Write a Review",
    },
    zh: {
      heroTitle: "客户的声音",
      heroDesc: "您的反馈有助于我们成长和进步。",
      avg: "平均评分",
      total: "总评价数",
      btn: "查看全部并撰写评价",
    },
  }[lang as "km" | "en" | "zh"] || {
    heroTitle: "Our Customer Voices",
    heroDesc: "Share your experience with us.",
    avg: "Average Rating",
    total: "Total Reviews",
    btn: "View All",
  };

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#0f172a] text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6">{tx.heroTitle}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {tx.heroDesc}
        </p>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/rating")}
            className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            {tx.btn}
          </button>
        </div>
      </section>

      <div className="py-16 px-6">
        {/* Stats Row Summary */}
        <div className="flex justify-center gap-12 mb-16 text-center">
          <div>
            <h2 className="text-5xl font-black text-slate-900">
              {stats.averageRating.toFixed(1)}
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase mt-2">
              {tx.avg}
            </p>
          </div>
          <div className="w-px h-16 bg-gray-200" />
          <div>
            <h2 className="text-5xl font-black text-slate-900">
              {stats.totalReviews}+
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase mt-2">
              {tx.total}
            </p>
          </div>
        </div>

        {/* 6 Cards Grid Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.slice(0, 6).map((r, i) => (
            <div
              key={i}
              className="p-8 bg-gray-50 rounded-4xl border border-gray-100 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {r.comment?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-tighter">
                    ✓ Verified Customer
                  </p>
                  <div className="text-yellow-400 text-[10px]">
                    {"★".repeat(r.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
