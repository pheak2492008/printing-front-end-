import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/* ── TRANSLATIONS ── */
const footerTx = {
  km: {
    desc: "ដំណោះស្រាយបោះពុម្ពកម្រិតខ្ពស់សម្រាប់តម្រូវការច្នៃប្រឌិតរបស់អ្នក។",
    links: "តំណភ្ជាប់រហ័ស",
    contact: "ទំនាក់ទំនង",
    address: "ផ្លូវ ១៩៨៦, សែនសុខ, ភ្នំពេញ",
    rights: "រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ PrintCraft",
    home: "ទំព័រដើម",
    about: "អំពីយើង",
    faq: "សំណួរដែលសួរញឹកញាប់",
    order: "ការកម្ម៉ង់",
  },
  en: {
    desc: "Premium printing solutions for your creative needs. Precision and quality are our top priorities.",
    links: "Quick Links",
    contact: "Contact Info",
    address: "St. 1986, Sen Sok, Phnom Penh",
    rights: "All rights reserved. PrintCraft",
    home: "Home",
    about: "About Us",
    faq: "FAQ",
    order: "Order Now",
  },
  zh: {
    desc: "满足您创意需求的优质印刷解决方案。精准和质量是我们的首要任务。",
    links: "快速链接",
    contact: "联系信息",
    address: "金边市，森速区，1986路",
    rights: "版权所有. PrintCraft",
    home: "首页",
    about: "关于我们",
    faq: "常见问题",
    order: "立即下单",
  },
};

export default function Footer() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = footerTx[lang as keyof typeof footerTx] || footerTx.en;

  const isLoggedIn = !!localStorage.getItem("userToken");

  const handleProtectedNav = (path: string) => {
    if (path === "" && !isLoggedIn) {
      navigate("/register");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-[#232a38] text-slate-300 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* 1. BRAND - Centered on mobile, Left on desktop */}
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="bg-[#0ea5e9] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
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
              <span className="font-bold text-2xl text-white">PrintCraft</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium max-w-sm">
              {t.desc}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://t.me/printmaster_kh"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#229ED9] hover:text-white transition-all"
              >
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* 2. QUICK LINKS - Centered Content */}
          <div className="flex flex-col items-center">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-6">{t.links}</h4>
              <ul className="space-y-4 font-medium">
                {[
                  { label: t.home, path: "/" },
                  { label: t.about, path: "/about" },
                  { label: t.faq, path: "/faq" },
                  { label: t.order, path: "/order" },
                ].map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => handleProtectedNav(link.path)}
                      className="hover:text-sky-400 transition-colors flex items-center justify-center md:justify-start group"
                    >
                      <ArrowRight
                        size={14}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2"
                      />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. CONTACT INFO - Centered on mobile, Right/Left on desktop */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-6">{t.contact}</h4>
            <ul className="space-y-5 font-medium">
              <li className="flex items-start gap-3 group justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <MapPin size={16} className="text-sky-500" />
                </div>
                <span className="text-sm max-w-[200px] text-center md:text-left">
                  {t.address}
                </span>
              </li>
              <li className="flex items-center gap-3 group justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <Phone size={16} className="text-sky-500" />
                </div>
                <span className="text-sm">+855 12 345 678</span>
              </li>
              <li className="flex items-center gap-3 group justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <Mail size={16} className="text-sky-500" />
                </div>
                <span className="text-sm">hello@printcraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR - Perfectly Centered ── */}
        <div className="pt-8 border-t border-white/10 text-center space-y-4">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {t.rights}
          </p>
          <div className="flex justify-center gap-8 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
