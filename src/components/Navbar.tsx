import { useRef, useState, useEffect } from "react";
import { useLanguage, type LangKey } from "../context/LanguageContext";
import { languages, t } from "../locales/translations";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const tx = t[lang];
  const currentLang = languages.find((l) => l.code === lang)!;

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
    <nav className="sticky top-0 z-50 w-full bg-[#f8f9f8] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex justify-between items-center h-20">
        {/* LOGO */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>

          <span className="font-bold text-[22px] tracking-tight text-[#1a1714]">
            PrintCraft
          </span>
        </div>

        {/* NAVIGATION */}
        <ul className="hidden lg:flex items-center gap-6 text-[17px] font-medium text-gray-600">
          <li className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-all cursor-pointer">
            {tx.nav.products}
          </li>

          <li className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-all cursor-pointer">
            {tx.nav.gallery}
          </li>

          <li className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-all cursor-pointer">
            {tx.nav.pricing}
          </li>

          <li className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition-all cursor-pointer">
            {tx.nav.about}
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {/* SIGN IN */}
          <button className="hidden sm:flex items-center justify-center h-[44px] min-w-[110px] px-5 text-[16px] font-medium text-gray-800 border border-gray-200 rounded-xl hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all">
            {tx.signIn}
          </button>

          {/* LANGUAGE */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center justify-center gap-2 h-[44px] min-w-[120px] px-5 bg-white border border-gray-200 rounded-xl text-[16px] hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="w-6 text-center">{currentLang.flag}</span>
              <span className="text-gray-800">{currentLang.label}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-50 overflow-hidden">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code as LangKey);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-[15px] transition-colors ${
                      lang === l.code
                        ? "bg-sky-50 text-[#0ea5e9] font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* GET STARTED */}
          <button className="flex items-center justify-center h-[44px] min-w-[130px] px-6 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-[16px] font-semibold rounded-xl transition-all shadow-sm hover:shadow-md">
            {tx.getStarted}
          </button>
        </div>
      </div>
    </nav>
  );
}
