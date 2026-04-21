export type LangKey = "km" | "en" | "zh";

export const languages = [
  { code: "km" as LangKey, label: "ខ្មែរ", flag: "🇰🇭" },
  { code: "en" as LangKey, label: "English", flag: "🇺🇸" },
  { code: "zh" as LangKey, label: "中文", flag: "🇨🇳" },
];

export interface ProductOverride {
  title: string;
  sub: string;
  desc: string;
}

export const t = {
  km: {
    signIn: "ចូល",
    getStarted: "ចាប់ផ្ដើម",
    loading: "កំពុងផ្ទុក...",
    notFound: "រកមិនឃើញផលិតផល",
    back: "ត្រឡប់ក្រោយ",
    details: "ព័ត៌មានលម្អិត",
    addToCart: "បន្ថែមទៅកន្ត្រក",
    nav: {
      home: "ទំព័រដើម",
      about: "អំពីយើង",
      faq: "សំណួរ",
      order: "ការបញ្ជាទិញ",
      profile: "ប្រវត្តិរូប",
      logout: "ចាកចេញ",
    },
    productOverrides: {
      3: {
        title: "បដា Vinyl ខាងក្រៅ",
        sub: "ដំណោះស្រាយបោះពុម្ពធន់នឹងអាកាសធាតុ",
        desc: "បដា Vinyl កម្រាស់ 13oz កម្រិតធ្ងន់ ធន់នឹងអាកាសធាតុ និងល្អឥតខ្ចោះសម្រាប់ព្រឹត្តិការណ៍ក្រៅផ្ទះ។ បដាលំដាប់អាជីពនេះត្រូវបានបោះពុម្ពដោយទឹកថ្នាំការពារកាំរស្មី UV ដើម្បីការពារការស្លេកពណ៌។ វាមានថ្នេរដែលផ្សារភ្ជាប់ដោយកំដៅសម្រាប់ភាពធន់បន្ថែម និងមានប្រឡៅដែកសម្រាប់ងាយស្រួលក្នុងការព្យួរ។ សមស្របបំផុតសម្រាប់ដាក់នៅមុខហាង ការបើកសម្ពោធ និងការប្រារព្ធពិធីផ្សេងៗនៅខាងក្រៅ។",
      },
    } as Record<number, ProductOverride>,
  },
  en: {
    signIn: "Sign In",
    getStarted: "Get Started",
    loading: "Loading...",
    notFound: "Product not found",
    back: "Back",
    details: "Product Details",
    addToCart: "Add to Cart",
    nav: {
      home: "Home",
      about: "About",
      faq: "FAQ",
      order: "Order",
      profile: "Profile",
      logout: "Logout",
    },
    productOverrides: {
      3: {
        title: "Vinyl Outdoor Banner",
        sub: "Weather-resistant solutions",
        desc: "Heavy-duty 13oz vinyl, weather-resistant, and perfect for outdoor events. This professional-grade banner is printed with UV-resistant inks to prevent fading. It features heat-welded hems for extra durability and optional metal grommets for easy hanging.",
      },
    } as Record<number, ProductOverride>,
  },
  zh: {
    signIn: "登录",
    getStarted: "开始使用",
    loading: "正在加载...",
    notFound: "找不到产品",
    back: "返回",
    details: "产品详情",
    addToCart: "加入购物车",
    nav: {
      home: "首页",
      about: "关于我们",
      faq: "常见问题",
      order: "订单",
      profile: "个人资料",
      logout: "退出登录",
    },
    productOverrides: {
      3: {
        title: "乙烯基户外横幅",
        sub: "耐候印刷解决方案",
        desc: "高品质 13 盎司乙烯基，防晒防水，非常适合户外活动。采用抗紫外线墨水印刷，防止褪色。具有热焊接边，经久耐用。",
      },
    } as Record<number, ProductOverride>,
  },
};
