import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage, type LangKey } from "../context/LanguageContext";
import { languages, t } from "../locales/translations";

export default function Navbar() {
  const navigate = useNavigate();
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f8f9f8]/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center h-20">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span className="font-bold text-[22px] text-[#1a1714]">
            PrintCraft
          </span>
        </div>

        {/* MENU */}
        <ul className="hidden lg:flex items-center gap-1 text-[15px] font-bold text-gray-500">
          {[
            { label: tx.nav.home, path: "/" },
            { label: tx.nav.about, path: "/about" },
            { label: tx.nav.faq, path: "/faq" },
            { label: tx.nav.order, path: "/order" },
            { label: tx.nav.profile, path: "/profile" },
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

        <div className="flex items-center gap-3">
          {/* SIGN IN */}
          <button
            className="hidden sm:block px-5 py-2.5 text-[15px] font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-white transition-all"
            onClick={() => navigate("/signin")}
          >
            {tx.signIn}
          </button>

          {/* LANGUAGE */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 h-[44px] px-4 bg-white border border-gray-200 rounded-xl hover:border-sky-300 transition-all"
            >
              <span>{currentLang.flag}</span>
              <span className="font-bold text-sm">{currentLang.label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as LangKey);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${lang === l.code ? "text-sky-500 font-bold bg-sky-50" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span>{l.flag}</span> {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
