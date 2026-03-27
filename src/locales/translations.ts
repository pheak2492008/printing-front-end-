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
      home: "ទំព័រដើម",
      about: "អំពីយើង",
      faq: "សំណួរ",
      order: "ការបញ្ជាទិញ",
      profile: "ប្រវត្តិរូប",
    },
    eyebrow: "វិចិត្រសាលការបំផុស",
    heroTitle: "រកឃើញដំណោះស្រាយការបោះពុម្ពសម្រាប់",
    heroEm: "គម្រោងធំបន្ទាប់របស់អ្នក",
    heroSub: "រកមើលបណ្តុំផលិតផលបោះពុម្ពប្រណីតរបស់យើង — ពីបដារហូតដល់នាមប័ណ្ណ។",
    cats: ["បដា", "រទេះ", "នាមប័ណ្ណ", "ផូស្ទែរ", "ខិត្តប័ណ្ណ"],
    learnMore: "ស្វែងយល់បន្ថែម",
    productItems: [
      { title: "បដា Vinyl ខាងក្រៅ", sub: "ដំណោះស្រាយបោះពុម្ពធន់នឹងអាកាសធាតុ" },
      { title: "បដា Roll-Up", sub: "អេក្រង់ចល័តសម្រាប់ព្រឹត្តិការណ៍" },
      { title: "រទេះតាំងពិព័រណ៍", sub: "រទេះបង្ហាញបញ្ឈរ" },
      { title: "នាមប័ណ្ណលំដាប់ខ្ពស់", sub: "ការបញ្ចប់បែបប្រណីត" },
      { title: "ផូស្ទែរព្រឹត្តិការណ៍", sub: "ពណ៌រស់រវើក" },
      { title: "ខិត្តប័ណ្ណផ្សព្វផ្សាយ", sub: "ការរចនាដិត" },
    ],
  },
  en: {
    signIn: "Sign In",
    getStarted: "Get Started",
    nav: {
      home: "Home",
      about: "About",
      faq: "FAQ",
      order: "Order",
      profile: "Profile",
    },
    eyebrow: "Inspiration Gallery",
    heroTitle: "Discover printing solutions for your",
    heroEm: "next big project",
    heroSub:
      "Browse our curated collection of premium print products — from banners to business cards.",
    cats: ["Banners", "Carts", "Business Cards", "Posters", "Flyers"],
    learnMore: "Learn More",
    productItems: [
      { title: "Vinyl Outdoor Banners", sub: "Weather-resistant solutions" },
      { title: "Roll-Up Banners", sub: "Portable displays for events" },
      { title: "Exhibition Cart", sub: "Vertical display cart" },
      { title: "Premium Business Cards", sub: "Luxury finishes" },
      { title: "Event Posters", sub: "Vibrant colors" },
      { title: "Promotional Flyers", sub: "Bold designs" },
    ],
  },
  zh: {
    signIn: "登录",
    getStarted: "开始使用",
    nav: {
      home: "首页",
      about: "关于我们",
      faq: "常见问题",
      order: "订单",
      profile: "个人资料",
    },
    eyebrow: "灵感画廊",
    heroTitle: "发现适合您的印刷解决方案",
    heroEm: "下一个大项目",
    heroSub: "浏览我们精心策划的优质印刷产品系列——从横幅到名片。",
    cats: ["横幅", "货车", "名片", "海报", "传单"],
    learnMore: "了解更多",
    productItems: [
      { title: "乙烯基户外横幅", sub: "耐候印刷解决方案" },
      { title: "易拉宝横幅", sub: "活动便携式展示" },
      { title: "展车", sub: "垂直展示车" },
      { title: "高档名片", sub: "豪华饰面" },
      { title: "活动海报", sub: "鲜艳的色彩" },
      { title: "宣传传单", sub: "大胆的设计" },
    ],
  },
};
