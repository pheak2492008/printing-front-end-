import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import {
  ChevronDown,
  MessageCircle,
  ArrowRight,
  Shield,
  Truck,
  Package,
  CreditCard,
  Clock,
  MapPin,
  Edit3,
} from "lucide-react";

/* ── TRANSLATIONS OBJECT ── */
const t = {
  en: {
    heroTag: "Support Center",
    heroTitle: "How can we help?",
    heroSub:
      "Everything you need to know about our printing services in Cambodia.",
    categories: "Categories",
    stuck: "Still stuck?",
    stuckSub: "Our experts are available 24/7 via Telegram or Live Chat.",
    contactBtn: "CONTACT SUPPORT",
    qSuffix: "Questions",
    tabs: {
      Ordering: "Ordering",
      Quality: "Quality & Files",
      Shipping: "Shipping",
      Payment: "Payment",
    },
    data: {
      Ordering: [
        {
          q: "How do I place an order?",
          a: "Choose your material, enter Width/Length, upload your design, and click 'Confirm'. You can track progress in your Profile.",
        },
        {
          q: "Do you offer urgent 1-hour printing?",
          a: "Yes! For small banners and stickers, we offer 'Express Printing' at our shop. Please call us after placing an order online to prioritize it.",
        },
        {
          q: "What if I don't have a design?",
          a: "No problem! Our in-house designers can help. Select the 'Need Design' option when ordering, and we will contact you.",
        },
      ],
      Quality: [
        {
          q: "What is the difference between Standard and UV printing?",
          a: "Standard is for short-term/indoor. UV printing is sun-resistant and waterproof—perfect for outdoor billboards in Cambodia.",
        },
        {
          q: "What does 'Low Resolution' warning mean?",
          a: "It means your image might look blurry when printed large. We recommend 150 DPI or higher for best results.",
        },
      ],
      Shipping: [
        {
          q: "Do you ship to all 25 provinces?",
          a: "Yes! We ship nationwide via Vireak Buntham, J&T, or Larryta. Shipping usually takes 1-2 days to provinces.",
        },
        {
          q: "How much is the delivery fee in Phnom Penh?",
          a: "Delivery within Phnom Penh starts from $1.50 depending on your distance and order size.",
        },
      ],
      Payment: [
        {
          q: "Which payment methods are accepted?",
          a: "We accept ABA Bank, Wing, ACLEDA, and Cash on Pickup (for small orders).",
        },
        {
          q: "Can I get a tax invoice (VAT)?",
          a: "Yes, for corporate clients, we can provide a formal tax invoice. Please provide your company details in the 'Note' section.",
        },
      ],
    },
  },
  km: {
    heroTag: "មជ្ឈមណ្ឌលជំនួយ",
    heroTitle: "តើមានអ្វីដែលយើងអាចជួយបាន?",
    heroSub:
      "ព័ត៌មានលម្អិតអំពីការបោះពុម្ព និងសេវាកម្មដឹកជញ្ជូនក្នុងប្រទេសកម្ពុជា។",
    categories: "ប្រភេទសំណួរ",
    stuck: "នៅតែមានចម្ងល់?",
    stuckSub: "ក្រុមការងារយើងរង់ចាំជួយអ្នក ២៤/៧ តាមរយៈ Telegram។",
    contactBtn: "ទាក់ទងមកយើង",
    qSuffix: "សំណួរអំពី",
    tabs: {
      Ordering: "ការបញ្ជាទិញ",
      Quality: "គុណភាព & ឯកសារ",
      Shipping: "ការដឹកជញ្ជូន",
      Payment: "ការទូទាត់",
    },
    data: {
      Ordering: [
        {
          q: "តើត្រូវកុម្ម៉ង់ដោយរបៀបណា?",
          a: "ជ្រើសរើសប្រភេទសម្ភារៈ បញ្ចូលទំហំ (ទទឹង/បណ្តោយ) បញ្ចូលហ្វាយរចនា រួចចុច 'Confirm'។",
        },
        {
          q: "តើមានសេវាបោះពុម្ពបន្ទាន់ ១ម៉ោង រួចរាល់ទេ?",
          a: "បាទមាន! សម្រាប់ការបោះពុម្ពខ្នាតតូច។ សូមទូរស័ព្ទមកយើងភ្លាមៗបន្ទាប់ពីកុម្ម៉ង់រួចដើម្បីឱ្យយើងរៀបចំជូនជាអាទិភាព។",
        },
        {
          q: "ចុះបើខ្ញុំមិនមានហ្វាយរចនា (Design)?",
          a: "មិនអីទេ! យើងមានអ្នកជំនាញរចនាជូន។ សូមជ្រើសរើស 'ត្រូវការអ្នករចនា' ពេលអ្នកកុម្ម៉ង់។",
        },
      ],
      Quality: [
        {
          q: "តើការបោះពុម្ព Standard និង UV ខុសគ្នាដូចម្តេច?",
          a: "Standard សម្រាប់ប្រើក្នុងផ្ទះ ឬរយៈពេលខ្លី។ UV គឺធន់នឹងកម្តៅថ្ងៃ និងទឹកភ្លៀង — ល្អបំផុតសម្រាប់ស្លាកប៉ាណូក្រៅផ្ទះ។",
        },
        {
          q: "តើការព្រមាន 'Low Resolution' មានន័យដូចម្តេច?",
          a: "វាមានន័យថា រូបភាពរបស់អ្នកអាចនឹងបែក ឬមិនច្បាស់នៅពេលបោះពុម្ពខ្នាតធំ។",
        },
      ],
      Shipping: [
        {
          q: "តើមានការដឹកជញ្ជូនទៅគ្រប់ ២៥ ខេត្ត-ក្រុងទេ?",
          a: "បាទ! យើងដឹកជញ្ជូនទូទាំងប្រទេសតាមរយៈ វីរៈប៊ុនថាំ, J&T ឬ លីហួរ។ ជាទូទៅចំណាយពេល ១-២ ថ្ងៃ។",
        },
        {
          q: "តើថ្លៃដឹកជញ្ជូនក្នុងភ្នំពេញតម្លៃប៉ុន្មាន?",
          a: "ក្នុងភ្នំពេញចាប់ពី $1.50 ឡើងទៅ អាស្រ័យលើចម្ងាយ និងទំហំអីវ៉ាន់។",
        },
      ],
      Payment: [
        {
          q: "តើអាចទូទាត់ប្រាក់តាមណាខ្លះ?",
          a: "យើងទទួលយក ABA Bank, Wing, ACLEDA និងការបង់ប្រាក់ផ្ទាល់ពេលមកយកអីវ៉ាន់។",
        },
        {
          q: "តើខ្ញុំអាចទទួលបានវិក្កយបត្រពន្ធ (VAT) ដែរឬទេ?",
          a: "បាទបាន! សម្រាប់ក្រុមហ៊ុន សូមបញ្ជាក់ព័ត៌មានក្រុមហ៊ុនក្នុងប្រអប់ 'Note'។",
        },
      ],
    },
  },
  zh: {
    heroTag: "帮助中心",
    heroTitle: "有什么可以帮您？",
    heroSub: "关于我们在柬埔寨的印刷服务的所有信息。",
    categories: "常见类别",
    stuck: "仍有疑问？",
    stuckSub: "我们的专家团队全天候为您提供帮助。",
    contactBtn: "联系支持",
    qSuffix: "相关问题",
    tabs: {
      Ordering: "订购流程",
      Quality: "品质与文件",
      Shipping: "物流配送",
      Payment: "付款方式",
    },
    data: {
      Ordering: [
        {
          q: "如何下单？",
          a: "选择材料，输入宽/高，上传设计稿，然后点击“确认”。您可以在个人资料中跟踪进度。",
        },
        {
          q: "你们提供1小时加急印刷吗？",
          a: "是的！对于小型横幅，我们提供加急服务。下单后请拨打我们的电话以优先处理。",
        },
        {
          q: "如果没有设计稿怎么办？",
          a: "没问题！我们有专业的平面设计师。下单时请选择“需要设计”选项。",
        },
      ],
      Quality: [
        {
          q: "标准印刷和UV印刷有什么区别？",
          a: "标准印刷适合短期或室内使用。UV印刷防晒防水，非常适合柬埔寨的户外广告牌。",
        },
        {
          q: "“低分辨率”警告是什么意思？",
          a: "这意味着您的图片在放大打印时可能会模糊。建议使用 150 DPI 或更高的分辨率。",
        },
      ],
      Shipping: [
        {
          q: "你们发货到全柬25个省份吗？",
          a: "是的！我们通过 Vireak Buntham、J&T 或 Larryta 发往全国。省际运输通常需要 1-2 天。",
        },
        {
          q: "金边市内的运费是多少？",
          a: "金边市内运费 $1.50 起，取决于距离和货物大小。",
        },
      ],
      Payment: [
        {
          q: "支持哪些付款方式？",
          a: "我们支持 ABA 银行、Wing、Acleda 以及到店取货付款。",
        },
        {
          q: "我可以申请增值税发票 (VAT) 吗？",
          a: "可以。请在订单备注中提供您的公司信息。",
        },
      ],
    },
  },
};

export default function FaqPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] =
    useState<keyof typeof t.en.data>("Ordering");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const tx = t[lang as keyof typeof t] || t.en;

  const categories = [
    { id: "Ordering", icon: <Package size={20} />, label: tx.tabs.Ordering },
    { id: "Quality", icon: <Edit3 size={20} />, label: tx.tabs.Quality },
    { id: "Shipping", icon: <Truck size={20} />, label: tx.tabs.Shipping },
    { id: "Payment", icon: <CreditCard size={20} />, label: tx.tabs.Payment },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 px-6 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 block">
            {tx.heroTag}
          </span>
          <h1
            className={`font-black text-white mb-6 tracking-tight ${lang === "en" ? "text-5xl md:text-6xl" : "text-3xl md:text-5xl"}`}
          >
            {tx.heroTitle}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl opacity-80">
            {tx.heroSub}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-28 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 pl-2">
                {tx.categories}
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as any);
                    setOpenIndex(null);
                  }}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                    activeTab === cat.id
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200/50 scale-[1.02]"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {cat.icon}
                    {cat.label}
                  </div>
                  <ArrowRight
                    size={14}
                    className={
                      activeTab === cat.id ? "opacity-100" : "opacity-0"
                    }
                  />
                </button>
              ))}

              {/* Contact Sidebar Card */}
              <div className="mt-10 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 text-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-600">
                  <MessageCircle size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{tx.stuck}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {tx.stuckSub}
                </p>
                <Link to="/about">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all uppercase tracking-widest shadow-lg">
                    {tx.contactBtn}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Accordion Content */}
          <div className="lg:w-3/4">
            <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
              <div className="w-2 h-10 bg-blue-600 rounded-full" />
              {(tx.tabs as any)[activeTab]} {tx.qSuffix}
            </h2>

            <div className="space-y-4">
              {(tx.data as any)[activeTab].map((item: any, i: number) => (
                <div
                  key={i}
                  className={`group border-2 transition-all duration-300 rounded-[2rem] overflow-hidden ${
                    openIndex === i
                      ? "border-blue-500 bg-white shadow-2xl shadow-blue-100"
                      : "border-slate-50 bg-white hover:border-blue-100 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full px-8 py-8 flex items-center justify-between text-left"
                  >
                    <span
                      className={`font-bold text-lg md:text-xl transition-colors ${openIndex === i ? "text-blue-600" : "text-slate-800"}`}
                    >
                      {item.q}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${openIndex === i ? "bg-blue-600 text-white rotate-180 shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}
                    >
                      <ChevronDown size={22} />
                    </div>
                  </button>

                  {openIndex === i && (
                    <div className="px-8 pb-10 text-slate-600 leading-relaxed text-base md:text-lg animate-in slide-in-from-top-4 duration-300">
                      <div className="pt-6 border-t border-slate-50 italic opacity-90">
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
