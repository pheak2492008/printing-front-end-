import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLanguage, type LangKey } from "../context/LanguageContext";
// import { useAuth } from "../context/AuthContext"; // Uncomment if needed
import { languages, t } from "../locales/translations";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang as keyof typeof t] || t.en;
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle click outside for language dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex justify-between items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
              <ShoppingBag size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl md:text-[22px] text-[#1a1714] tracking-tight">
              BW Printing
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-2 text-[15px] font-bold text-gray-500">
            {[
              { label: tx.nav.home, path: "/" },
              { label: tx.nav.about, path: "/about" },
              { label: tx.nav.faq, path: "/faq" },
              { label: tx.nav.order, path: "/order" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? "text-[#17aaee] bg-sky-50"
                      : "hover:text-[#0ea5e9] hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* LANGUAGE DROPDOWN */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 h-[40px] md:h-[44px] px-3 md:px-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-sky-300 transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="hidden sm:block font-bold text-xs md:text-sm text-gray-700">
                  {currentLang.label}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in zoom-in duration-200">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code as LangKey);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        lang === l.code
                          ? "text-sky-500 font-bold bg-sky-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-6 space-y-2 z-40 animate-in slide-in-from-top duration-300">
            {[
              { label: tx.nav.home, path: "/" },
              { label: tx.nav.about, path: "/about" },
              { label: tx.nav.faq, path: "/faq" },
              { label: tx.nav.order, path: "/order" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                  location.pathname === item.path
                    ? "bg-sky-50 text-sky-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
