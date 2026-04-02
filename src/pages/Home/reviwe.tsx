import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

/* ── TRANSLATIONS ── */
const t = {
  km: {
    eyebrow: "មតិអតិថិជន",
    title: "អ្វីដែលអតិថិជននិយាយ",
    sub: "ស្វែងយល់ពីបទពិសោធន៍ពិតប្រាកដពីអតិថិជនរបស់យើង",
    verified: "អតិថិជនផ្ទៀងផ្ទាត់",
    totalReviews: "មតិទាំងអស់",
    rating: "ការវាយតម្លៃជាមធ្យម",
  },
  en: {
    eyebrow: "Customer Reviews",
    title: "What Our Clients Say",
    sub: "Real experiences from real customers who trust our printing services.",
    verified: "Verified Customer",
    totalReviews: "Total Reviews",
    rating: "Average Rating",
  },
  zh: {
    eyebrow: "客户评价",
    title: "客户怎么说",
    sub: "来自真实客户的真实体验，他们信任我们的印刷服务。",
    verified: "认证客户",
    totalReviews: "总评价数",
    rating: "平均评分",
  },
};

interface Review {
  id: number;
  name: string;
  nameKm: string;
  nameZh: string;
  role: string;
  roleKm: string;
  roleZh: string;
  rating: number;
  comment: string;
  commentKm: string;
  commentZh: string;
  product: string;
  productKm: string;
  productZh: string;
  avatar: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sophea Kim",
    nameKm: "សុភា គីម",
    nameZh: "索菲亚·金",
    role: "Marketing Director",
    roleKm: "នាយកផ្នែកទីផ្សារ",
    roleZh: "市场总监",
    rating: 5,
    comment:
      "Absolutely stunning quality! Our outdoor banners looked incredible at the trade show. The colors were vibrant and the material was super durable.",
    commentKm:
      "គុណភាពល្អឥតខ្ចោះ! បដាខាងក្រៅរបស់យើងមើលទៅស្រស់ស្អាតណាស់នៅក្នុងពិព័រណ៍ពាណិជ្ជកម្ម ពណ៌រស់រវើក ហើយសម្ភារៈមានភាពរឹងមាំ។",
    commentZh:
      "质量绝对令人惊叹！我们的户外横幅在展览会上看起来令人难以置信，颜色鲜艳，材料非常耐用。",
    product: "Vinyl Outdoor Banners",
    productKm: "បដា Vinyl ខាងក្រៅ",
    productZh: "乙烯基户外横幅",
    avatar:
      "https://ui-avatars.com/api/?name=SK&background=2563eb&color=fff&size=80&bold=true",
    date: "March 2025",
  },
  {
    id: 2,
    name: "David Chen",
    nameKm: "ដេវីដ ចិន",
    nameZh: "陈大卫",
    role: "Business Owner",
    roleKm: "ម្ចាស់អាជីវកម្ម",
    roleZh: "企业主",
    rating: 5,
    comment:
      "The business cards exceeded my expectations. Premium feel, sharp print, and delivered on time. I've already ordered three batches!",
    commentKm:
      "នាមប័ណ្ណលើសសំណូមពររបស់ខ្ញុំ។ អារម្មណ៍ប្រណីត ការបោះពុម្ពច្បាស់ ហើយបញ្ជូនទាន់ពេល ខ្ញុំបានបញ្ជាទិញបីលើករួចហើយ!",
    commentZh:
      "名片超出了我的预期。质感高端，印刷清晰，准时交货。我已经订了三批了！",
    product: "Premium Business Cards",
    productKm: "នាមប័ណ្ណលំដាប់ខ្ពស់",
    productZh: "高档名片",
    avatar:
      "https://ui-avatars.com/api/?name=DC&background=eb2546&color=fff&size=80&bold=true",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Lina Prak",
    nameKm: "លីណា ប្រាក់",
    nameZh: "莉娜·普拉克",
    role: "Event Coordinator",
    roleKm: "អ្នកសម្របសម្រួលព្រឹត្តិការណ៍",
    roleZh: "活动协调员",
    rating: 5,
    comment:
      "Fast turnaround and exceptional quality for our event posters. The team was responsive and helpful throughout the whole process.",
    commentKm:
      "ល្បឿនលឿន និងគុណភាពពិសេសសម្រាប់ផូស្ទែរព្រឹត្តិការណ៍របស់យើង ក្រុមការងារបានឆ្លើយតបនឹងជួយពេញដំណើរការ។",
    commentZh:
      "我们活动海报的交货速度快，质量卓越。整个过程中团队响应迅速，非常有帮助。",
    product: "Event Posters",
    productKm: "ផូស្ទែរព្រឹត្តិការណ៍",
    productZh: "活动海报",
    avatar:
      "https://ui-avatars.com/api/?name=LP&background=059669&color=fff&size=80&bold=true",
    date: "January 2025",
  },
  {
    id: 4,
    name: "James Wu",
    nameKm: "ជេម វូ",
    nameZh: "吴杰姆斯",
    role: "Retail Manager",
    roleKm: "អ្នកគ្រប់គ្រងលក់រាយ",
    roleZh: "零售经理",
    rating: 4,
    comment:
      "Great service and the flyers really helped boost our store promotion. Will definitely order again next month.",
    commentKm:
      "សេវាកម្មល្អ ហើយខិត្តប័ណ្ណពិតជាជួយជំរុញការផ្សព្វផ្សាយហាងរបស់យើង នឹងបញ្ជាទិញម្ដងទៀតខែក្រោយ។",
    commentZh:
      "服务很好，传单确实帮助促进了我们的门店促销活动。下个月一定会再次订购。",
    product: "Promotional Flyers",
    productKm: "ខិត្តប័ណ្ណផ្សព្វផ្សាយ",
    productZh: "宣传传单",
    avatar:
      "https://ui-avatars.com/api/?name=JW&background=7c3aed&color=fff&size=80&bold=true",
    date: "December 2024",
  },
  {
    id: 5,
    name: "Maly Heng",
    nameKm: "មាលី ហេង",
    nameZh: "马利·衡",
    role: "Startup Founder",
    roleKm: "ស្ថាបនិកស្តាតអាប",
    roleZh: "创业公司创始人",
    rating: 5,
    comment:
      "Used the exhibition carts for our product launch — premium quality and very easy to set up. Got so many compliments!",
    commentKm:
      "ប្រើរទេះតាំងពិព័រណ៍សម្រាប់ការចាប់ផ្ដើមផលិតផលរបស់យើង — គុណភាពប្រណីត ហើយងាយស្រួលដំឡើង បានទទួលការអបអរសាទរច្រើនណាស់!",
    commentZh:
      "在我们的产品发布会上使用了展览推车——品质高端，非常容易安装。收到了很多赞美！",
    product: "Exhibition Carts",
    productKm: "រទេះតាំងពិព័រណ៍",
    productZh: "展车",
    avatar:
      "https://ui-avatars.com/api/?name=MH&background=d97706&color=fff&size=80&bold=true",
    date: "November 2024",
  },
  {
    id: 6,
    name: "Tom Rivera",
    nameKm: "តុម រីវេរ៉ា",
    nameZh: "汤姆·里维拉",
    role: "Creative Director",
    roleKm: "នាយកគំនិតច្នៃប្រឌិត",
    roleZh: "创意总监",
    rating: 5,
    comment:
      "The large format banners for our campaign were absolutely perfect. Crisp, vibrant and exactly what we designed.",
    commentKm:
      "បដាទំហំធំសម្រាប់យុទ្ធនាការរបស់យើងល្អឥតខ្ចោះ ច្បាស់ រស់រវើក ហើយត្រូវនឹងការរចនារបស់យើង។",
    commentZh: "我们活动的大型横幅绝对完美，清晰鲜艳，与我们的设计完全一致。",
    product: "Large Format Banners",
    productKm: "បដាទំហំធំ",
    productZh: "大型横幅",
    avatar:
      "https://ui-avatars.com/api/?name=TR&background=0f172a&color=fff&size=80&bold=true",
    date: "October 2024",
  },
];

const StarRating = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) => {
  const s = size === "lg" ? "text-xl" : "text-sm";
  return (
    <div className={`flex gap-0.5 ${s}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function Reviews() {
  const { lang } = useLanguage();
  const tx = t[lang as keyof typeof t] || t.en;
  const [activeIdx, setActiveIdx] = useState(0);

  /* Per-language field helpers */
  const getName = (r: Review) =>
    lang === "km" ? r.nameKm : lang === "zh" ? r.nameZh : r.name;
  const getRole = (r: Review) =>
    lang === "km" ? r.roleKm : lang === "zh" ? r.roleZh : r.role;
  const getComment = (r: Review) =>
    lang === "km" ? r.commentKm : lang === "zh" ? r.commentZh : r.comment;
  const getProduct = (r: Review) =>
    lang === "km" ? r.productKm : lang === "zh" ? r.productZh : r.product;

  const totalRating = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-3">
            {tx.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {tx.title}
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">{tx.sub}</p>
        </div>

        {/* ── Stats Row ── */}
        <div className="flex justify-center gap-10 mb-12">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-gray-900">
              {totalRating}
            </div>
            <StarRating rating={5} size="lg" />
            <p className="text-gray-500 text-xs mt-1">{tx.rating}</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-4xl font-extrabold text-gray-900">
              {reviews.length * 47}+
            </div>
            <div className="flex justify-center gap-1 my-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-blue-600" />
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-1">{tx.totalReviews}</p>
          </div>
        </div>

        {/* ── Featured Review (large) ── */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-8 shadow-lg transition-all duration-500"
          style={{
            background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={reviews[activeIdx].avatar}
              alt={getName(reviews[activeIdx])}
              className="w-20 h-20 rounded-2xl shadow-lg flex-shrink-0"
            />
            <div className="flex-1">
              <StarRating rating={reviews[activeIdx].rating} size="lg" />
              <blockquote className="text-white text-xl font-semibold leading-relaxed mt-4 mb-6">
                "{getComment(reviews[activeIdx])}"
              </blockquote>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div>
                  <p className="text-white font-bold">
                    {getName(reviews[activeIdx])}
                  </p>
                  <p className="text-blue-300 text-sm">
                    {getRole(reviews[activeIdx])}
                  </p>
                </div>
                <div className="sm:ml-auto flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/10 text-blue-200 text-xs rounded-full border border-white/20">
                    {getProduct(reviews[activeIdx])}
                  </span>
                  <span className="text-blue-400 text-xs">
                    {reviews[activeIdx].date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dot navigation */}
          <div className="flex gap-2 mt-8 justify-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeIdx === i
                    ? "w-8 h-2 bg-[#eb2546]"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Review Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              onClick={() => setActiveIdx(i)}
              className={`group cursor-pointer bg-white rounded-2xl p-6 border transition-all duration-300 ${
                activeIdx === i
                  ? "border-blue-600 shadow-lg shadow-blue-100 -translate-y-1"
                  : "border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={r.avatar}
                  alt={getName(r)}
                  className="w-11 h-11 rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">
                    {getName(r)}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{getRole(r)}</p>
                </div>
                <StarRating rating={r.rating} />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                "{getComment(r)}"
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                  {getProduct(r)}
                </span>
                <span className="text-[10px] text-gray-400">{r.date}</span>
              </div>

              {/* Verified badge */}
              <div className="flex items-center gap-1 mt-2">
                <span className="text-green-500 text-xs">✓</span>
                <span className="text-green-600 text-[10px] font-semibold">
                  {tx.verified}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
