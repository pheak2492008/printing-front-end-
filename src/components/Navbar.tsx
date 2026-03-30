import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLanguage, type LangKey } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { languages, t } from "../locales/translations";
import { LogOut, User, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang as keyof typeof t] || t.en;
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f8f9f8]/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center h-20">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 cursor-pointer"
        >
          <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
            <ShoppingBag size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-[22px] text-[#1a1714] tracking-tight">
            PrintCraft
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-1 text-[15px] font-bold text-gray-500">
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
                    ? "text-[#0ea5e9]"
                    : "hover:text-[#0ea5e9]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-[15px] font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-white transition-all"
            >
              {tx.signIn}
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-[15px] font-bold text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}

          {/* LANGUAGE */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 h-[44px] px-4 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden md:block font-bold text-sm text-gray-700">
                {currentLang.label}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[60]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as LangKey);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${lang === l.code ? "text-sky-500 font-bold bg-sky-50" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- PROFILE ICON BUTTON --- */}
          <Link
            to="/profile"
            className={`flex items-center justify-center w-[44px] h-[44px] rounded-xl border transition-all shadow-sm ${
              location.pathname === "/profile"
                ? "bg-sky-50 border-sky-200 text-sky-600"
                : "bg-white border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500"
            }`}
          >
            <User size={22} />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
