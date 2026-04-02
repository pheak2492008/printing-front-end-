import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

/* ── TRANSLATIONS ── */
const t = {
  km: {
    eyebrow: "ដៃគូរបស់យើង",
    title: "ទុកចិត្តដោយម៉ាក់ជាច្រើន",
    sub: "យើងធ្វើការជាមួយក្រុមហ៊ុនឈានមុខគេដើម្បីផ្តល់សេវាបោះពុម្ពដ៏ល្អបំផុត",
    become: "ក្លាយជាដៃគូ",
    trusted: "ដៃគូដែលទុកចិត្ត",
  },
  en: {
    eyebrow: "Our Partners",
    title: "Trusted by Leading Brands",
    sub: "We collaborate with industry-leading companies to deliver the best printing experience.",
    become: "Become a Partner",
    trusted: "Trusted Partner",
  },
  zh: {
    eyebrow: "我们的合作伙伴",
    title: "受领先品牌信赖",
    sub: "我们与行业领先企业合作，提供最优质的印刷体验。",
    become: "成为合作伙伴",
    trusted: "信任合作伙伴",
  },
};

const partners = [
  {
    id: 1,
    name: "PrintMaster Pro",
    category: "Printing Solutions",
    logo: "https://ui-avatars.com/api/?name=PM&background=2563eb&color=fff&size=80&bold=true&font-size=0.4",
    description: "Industry leader in commercial printing technology.",
    since: "2018",
  },
  {
    id: 2,
    name: "BrandWorks Asia",
    category: "Brand Identity",
    logo: "https://ui-avatars.com/api/?name=BW&background=eb2546&color=fff&size=80&bold=true&font-size=0.4",
    description: "Strategic branding partner across Southeast Asia.",
    since: "2019",
  },
  {
    id: 3,
    name: "LogoNation",
    category: "Design & Creative",
    logo: "https://ui-avatars.com/api/?name=LN&background=0f172a&color=fff&size=80&bold=true&font-size=0.4",
    description: "Award-winning design studio for visual identity.",
    since: "2020",
  },
  {
    id: 4,
    name: "MediaHub KH",
    category: "Media & Marketing",
    logo: "https://ui-avatars.com/api/?name=MH&background=059669&color=fff&size=80&bold=true&font-size=0.4",
    description: "Cambodia's top media and advertising network.",
    since: "2021",
  },
  {
    id: 5,
    name: "SignCraft Co.",
    category: "Signage & Display",
    logo: "https://ui-avatars.com/api/?name=SC&background=7c3aed&color=fff&size=80&bold=true&font-size=0.4",
    description: "Specializing in large-format signage and display.",
    since: "2020",
  },
  {
    id: 6,
    name: "EventForge",
    category: "Event & Exhibitions",
    logo: "https://ui-avatars.com/api/?name=EF&background=d97706&color=fff&size=80&bold=true&font-size=0.4",
    description: "Premier event production and exhibition partner.",
    since: "2022",
  },
];

export default function Partner() {
  const { lang } = useLanguage();
  const tx = t[lang as keyof typeof t] || t.en;

  return (
    <section className="bg-white py-16 overflow-hidden">
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

        {/* ── Partner Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Logo circle */}
              <div className="relative mb-5">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-16 h-16 rounded-2xl shadow-md"
                />
                <span className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
              </div>

              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                {p.category}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                {p.description}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xs text-gray-400">
                  {tx.trusted} · Since {p.since}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div
          className="rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
          style={{
            background: "linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)",
          }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white mb-1">
              {tx.become}?
            </h3>
            <p className="text-blue-300 text-sm">
              Join our growing network of trusted printing partners.
            </p>
          </div>
          <Link to="/order" className="self-stretch md:self-auto">
            <button className="px-8 py-3 bg-[#eb2546] hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-md text-sm whitespace-nowrap">
              {tx.become} →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
