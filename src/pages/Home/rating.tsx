import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { ChevronLeft, Star, CheckCircle2 } from "lucide-react";

export default function RatingPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [reviews, setReviews] = useState<any[]>([]);

  const tx = {
    km: {
      title: "សំឡេងរបស់អតិថិជនយើង",
      desc: "មតិកែលម្អរបស់អ្នកជួយយើងឱ្យកាន់តែប្រសើរឡើង។",
      write: "សរសេរមតិយោបល់",
      submit: "បញ្ជូនមតិ",
      placeholder: "ចែករំលែកបទពិសោធន៍របស់អ្នក...",
      back: "ត្រឡប់ក្រោយ", // Matches
      seeAll: "ការវាយតម្លៃទាំងអស់",
      verified: "អតិថិជនជឿជាក់",
    },
    en: {
      title: "Our Customer Voices",
      desc: "Your feedback helps us grow and provide better service.",
      write: "Write a Review",
      submit: "Submit Review",
      placeholder: "Share your experience...",
      back: "Back",
      seeAll: "All Ratings",
      verified: "Verified Customer",
    },
  }[lang as "km" | "en"] || { title: "Reviews", back: "Back" };

  const loadReviews = () => {
    fetch("https://printing-back-end.onrender.com/api/v1/reviews/all")
      .then((res) => res.json())
      .then((data) => setReviews([...data].reverse()))
      .catch((err) => console.error("Failed to load reviews", err));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://printing-back-end.onrender.com/api/v1/reviews/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId: 1 }),
      },
    );
    if (res.ok) {
      setForm({ rating: 5, comment: "" });
      loadReviews();
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">
      {/* 2. Hero Section - Deep Slate Blue closer to navbar */}
      <section className="bg-[#0f172a] text-white py-20 px-6 text-center shadow-inner">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            {tx.title}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            {tx.desc}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        {/* Review Submission Card */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl shadow-slate-200/40 border border-slate-100 mb-20">
          <h3 className="text-2xl font-black text-center mb-8 text-slate-900 uppercase tracking-widest">
            {tx.write}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className={`w-14 h-14 rounded-2xl font-black transition-all flex items-center justify-center gap-1 ${
                    form.rating === n
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {n}{" "}
                  <Star
                    size={16}
                    fill={form.rating === n ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-6 bg-slate-50 rounded-[24px] h-40 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 border-2 border-transparent transition-all text-lg resize-none"
              placeholder={tx.placeholder}
              value={form.comment}
              required
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <div className="flex justify-center">
              <button className="px-12 py-5 bg-[#0f172a] text-white rounded-[20px] font-black text-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95 uppercase">
                {tx.submit}
              </button>
            </div>
          </form>
        </div>

        {/* Ratings Header */}
        <div className="flex items-center gap-6 mb-10">
          <h2 className="text-3xl font-black text-slate-900 whitespace-nowrap">
            {tx.seeAll}
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Modern Review Cards */}
        <div className="grid grid-cols-1 gap-6">
          {reviews.slice(0, 6).map((r, i) => (
            <div
              key={i}
              className="flex gap-6 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-2xl shrink-0">
                {r.comment?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-col">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          size={16}
                          fill={s < r.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase mt-1">
                      <CheckCircle2 size={12} /> {tx.verified}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg italic italic">
                  "{r.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
