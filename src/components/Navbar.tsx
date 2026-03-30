import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage, type LangKey } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext"; // Import Auth
import { languages, t } from "../locales/translations";
import { LogOut, User, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const { isAuthenticated, logout } = useAuth(); // Get auth state
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang as keyof typeof t] || t.en;
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Close dropdown when clicking outside
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
        {/* --- LOGO --- */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
            <ShoppingBag size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-[22px] text-[#1a1714] tracking-tight">
            PrintCraft
          </span>
        </div>

        {/* --- DESKTOP MENU --- */}
        <ul className="hidden lg:flex items-center gap-1 text-[15px] font-bold text-gray-500">
          {[
            { label: tx.nav.home, path: "/" },
            { label: tx.nav.about, path: "/about" },
            { label: tx.nav.faq, path: "/faq" },
            { label: tx.nav.order, path: "/order" },
          ].map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className="px-4 py-2 rounded-xl hover:bg-white hover:text-[#0ea5e9] transition-all cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* --- RIGHT SECTION: AUTH & LANG --- */}
        <div className="flex items-center gap-3">
          {/* LOGIN / LOGOUT BUTTON */}
          {!isAuthenticated ? (
            <button
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-[15px] font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-white hover:border-sky-300 transition-all"
              onClick={() => navigate("/login")}
            >
              {tx.signIn}
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-[15px] font-bold text-red-500 border border-red-100 rounded-xl hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}

          {/* LANGUAGE SELECTOR */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 h-[44px] px-4 bg-white border border-gray-200 rounded-xl hover:border-sky-300 transition-all shadow-sm"
            >
              <span className="text-lg">{currentLang.flag}</span>
              <span className="hidden md:block font-bold text-sm text-gray-700">
                {currentLang.label}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2">
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

          {/* PROFILE ICON */}
          <button
            onClick={() =>
              isAuthenticated ? navigate("/profile") : navigate("/login")
            }
            className={`flex items-center justify-center w-[44px] h-[44px] rounded-xl border transition-all shadow-sm ${
              isAuthenticated
                ? "bg-sky-50 border-sky-200 text-sky-600"
                : "bg-white border-gray-200 text-gray-400 hover:border-sky-300 hover:text-sky-500"
            }`}
          >
            <User size={22} />
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-4 animate-in slide-in-from-top w-full">
          <Link
            to="/"
            className="block font-bold text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            {tx.nav.home}
          </Link>
          <Link
            to="/order"
            className="block font-bold text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            {tx.nav.order}
          </Link>
          <hr />
          {!isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold"
            >
              {tx.signIn}
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-red-50 text-red-500 rounded-xl font-bold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
