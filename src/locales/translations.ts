// src/locales/translations.ts

export type LangKey = "km" | "en" | "zh";

export const languages = [
  { code: "km" as LangKey, label: "ខ្មែរ", flag: "🇰🇭" },
  { code: "en" as LangKey, label: "English", flag: "🇺🇸" },
  { code: "zh" as LangKey, label: "中文", flag: "🇨🇳" },
];

export const t = {
  km: {
    signIn: "ចូល",
    getStarted: "ចាប់ផ្ដើម",
    nav: {
      products: "ផលិតផល",
      gallery: "វិចិត្រសាល",
      pricing: "តម្លៃ",
      about: "អំពីយើង",
    },
    eyebrow: "វិចិត្រសាលការបំផុស",
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    // ... Copy the rest of your Khmer translations here
  },
  en: {
    signIn: "Sign in",
    getStarted: "Get Started",
    nav: {
      products: "Products",
      gallery: "Gallery",
      pricing: "Pricing",
      about: "About",
    },
    eyebrow: "Inspiration Gallery",
    heroTitle: "Discover printing solutions for your",
    heroEm: "next big project",
    // ... Copy the rest of your English translations here
  },
  zh: {
    signIn: "登录",
    getStarted: "开始使用",
    nav: {
      products: "产品",
      gallery: "画廊",
      pricing: "定价",
      about: "关于我们",
    },
    eyebrow: "灵感画廊",
    // ... Copy the rest of your Chinese translations here
  },
};
