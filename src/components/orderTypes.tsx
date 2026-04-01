import abaQR from "../assets/aba.png";
import acledaQR from "../assets/acleda.png";
import wingQR from "../assets/pring.jpg";

/** * PAYMENT_DATA Configuration
 * Includes QR codes and branding for the payment screen
 */
export const PAYMENT_DATA: Record<
  string,
  {
    qr: string;
    name: string;
    color: string;
    bg: string;
    logo: string;
    label: string;
  }
> = {
  ABA: {
    qr: abaQR,
    name: "Printing service Co., Ltd",
    color: "#1a56db",
    bg: "#eff6ff",
    logo: "🏦",
    label: "ABA Bank",
  },
  ACLEDA: {
    qr: acledaQR,
    name: "Printing service Co., Ltd",
    color: "#d97706",
    bg: "#fffbeb",
    logo: "🏧",
    label: "ACLEDA Bank",
  },
  WING: {
    qr: wingQR,
    name: "Printing service Co., Ltd",
    color: "#7c3aed",
    bg: "#f5f3ff",
    logo: "📱",
    label: "Wing",
  },
};

/** * TRANSLATIONS
 * Supports English, Khmer, and Chinese
 */
export const TRANSLATIONS = {
  en: {
    heroTitle: "Custom Outdoor Banner",
    heroSub: "Heavy-duty 440gsm printing with weather-resistant coating.",
    step1: "MATERIAL SELECTION",
    banner: "01. BANNER",
    sticker: "02. STICKER",
    step2: "DIMENSIONS",
    width: "Width (m)",
    length: "Length (m)",
    step3: "INK CHOICE",
    step4: "UPLOAD DESIGN FILE",
    tapUpload: "Tap to upload file",
    descTitle: "ORDER DESCRIPTION",
    descPlaceholder: "Describe your design needs here...",
    summary: "Order Summary",
    receiving: "RECEIVING METHOD",
    pickup: "Self-Pickup",
    delivery: "Home Delivery",
    totalLabel: "ESTIMATED TOTAL",
    agree: "I verify that all details are correct",
    btnConfirm: "Confirm Order",
    bannerOptions: ["Standard Flex", "UV High Gloss", "Mesh Banner"],
    stickerOptions: ["White Vinyl", "Clear Sticker", "3M Premium"],
    deliveryAddress: "DELIVERY ADDRESS",
    addressPlaceholder: "Enter your full delivery address...",
    phoneNumber: "CONTACT PHONE",
    phonePlaceholder: "e.g. 012 345 678",
    landmark: "LANDMARK / NOTE FOR DRIVER",
    landmarkPlaceholder: "e.g. Near the blue gate, 2nd floor...",
    deliveryNote: "Delivery within Phnom Penh · Fee: +$2.00",
    deliveryFee: "Delivery Fee",
    shareLocation: "Share My GPS Location",
    locationShared: "Location Shared ✓",
    paymentMethod: "PAYMENT METHOD",
    paymentDone: "I've Completed Payment",
    paymentNote: "After scanning, tap the button below to confirm your order.",
    scanQR: "Scan QR to Pay",
    accountName: "ACCOUNT NAME",
    totalToPay: "TOTAL TO PAY",
    paymentScreen: "Complete Payment",
    backToOrder: "Back to Order",
  },
  km: {
    heroTitle: "បដាផ្សព្វផ្សាយខាងក្រៅ",
    heroSub: "ការបោះពុម្ពគុណភាពខ្ពស់ 440gsm ធន់នឹងកម្តៅថ្ងៃ។",
    step1: "ការជ្រើសរើសសម្ភារៈ",
    banner: "០១. ប្រភេទបដា",
    sticker: "០២. ប្រភេទស្ទីគ័រ",
    step2: "ទំហំផលិតផល",
    width: "ទទឹង (ម៉ែត្រ)",
    length: "បណ្តោយ (ម៉ែត្រ)",
    step3: "ជម្រើសទឹកថ្នាំ",
    step4: "បញ្ជូនឯកសាររចនា",
    tapUpload: "ចុចទីនេះដើម្បីបញ្ចូលឯកសារ",
    descTitle: "ការពិពណ៌នាអំពីការបញ្ជាទិញ",
    descPlaceholder: "រៀបរាប់ពីអ្វីដែលលោកអ្នកចង់បាន...",
    summary: "ព័ត៌មានលម្អិត",
    receiving: "វិធីសាស្រ្តទទួលបានទំនិញ",
    pickup: "មកយកផ្ទាល់",
    delivery: "ដឹកជញ្ជូនដល់ផ្ទះ",
    totalLabel: "តម្លៃសរុបប៉ាន់ស្មាន",
    agree: "ខ្ញុំយល់ព្រមលើការទូទាត់ និងលក្ខខណ្ឌ",
    btnConfirm: "បញ្ជាក់ការបញ្ជាទិញ",
    bannerOptions: ["បដាស្តង់ដារ", "បដាប្រភេទ UV", "បដាសំណាញ់"],
    stickerOptions: ["ស្ទីគ័រពណ៌ស", "ស្ទីគ័រថ្លា", "ស្ទីគ័រ 3M"],
    deliveryAddress: "អាសយដ្ឋានដឹកជញ្ជូន",
    addressPlaceholder: "បញ្ចូលអាសយដ្ឋានពេញលេញ...",
    phoneNumber: "លេខទូរស័ព្ទទំនាក់ទំនង",
    phonePlaceholder: "ឧ. ០១២ ៣៤៥ ៦៧៨",
    landmark: "ចំណុចសំគាល់ / សម្រាប់អ្នកដឹក",
    landmarkPlaceholder: "ឧ. នៅជិតទ្វារពណ៌ខៀវ ជាន់ទី២...",
    deliveryNote: "ដឹកក្នុងភ្នំពេញ · ថ្លៃ: +$2.00",
    deliveryFee: "ថ្លៃដឹកជញ្ជូន",
    shareLocation: "ចែករំលែកទីតាំង GPS",
    locationShared: "ទីតាំងត្រូវបានចែករំលែក ✓",
    paymentMethod: "វិធីសាស្រ្តទូទាត់",
    paymentDone: "ខ្ញុំបានទូទាត់រួចហើយ",
    paymentNote: "បន្ទាប់ពីស្កែន សូមចុចប៊ូតុងខាងក្រោម។",
    scanQR: "ស្កែន QR ដើម្បីបង់ប្រាក់",
    accountName: "ឈ្មោះគណនី",
    totalToPay: "តម្លៃដែលត្រូវបង់",
    paymentScreen: "បញ្ចប់ការទូទាត់",
    backToOrder: "ត្រឡប់ក្រោយ",
  },
  zh: {
    heroTitle: "定制户外横幅",
    heroSub: "重型440gsm印刷，防风雨涂层。",
    step1: "材料选择",
    banner: "01. 横幅",
    sticker: "02. 贴纸",
    step2: "尺寸",
    width: "宽度（米）",
    length: "长度（米）",
    step3: "油墨选择",
    step4: "上传设计文件",
    tapUpload: "点击上传文件",
    descTitle: "订单说明",
    descPlaceholder: "请描述您的设计需求...",
    summary: "订单摘要",
    receiving: "收货方式",
    pickup: "自取",
    delivery: "送货上门",
    totalLabel: "预计总价",
    agree: "我确认所有信息均正确无误",
    btnConfirm: "确认订单",
    bannerOptions: ["标准横幅", "UV高光", "网格横幅"],
    stickerOptions: ["白色乙烯", "透明贴纸", "3M优质"],
    deliveryAddress: "送货地址",
    addressPlaceholder: "请输入完整的送货地址...",
    phoneNumber: "联系电话",
    phonePlaceholder: "例如：012 345 678",
    landmark: "地标 / 司机备注",
    landmarkPlaceholder: "例如：蓝色大门旁，二楼...",
    deliveryNote: "金边市内配送 · 费用：+$2.00",
    deliveryFee: "配送费",
    shareLocation: "分享我的GPS位置",
    locationShared: "位置已分享 ✓",
    paymentMethod: "支付方式",
    paymentDone: "我已完成付款",
    paymentNote: "扫描后，请点击下方按钮确认您的订单。",
    scanQR: "扫描二维码付款",
    accountName: "账户名称",
    totalToPay: "应付总额",
    paymentScreen: "完成付款",
    backToOrder: "返回订单",
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;
export type Tx = typeof TRANSLATIONS.en;

/**
 * GLOBAL STATE INTERFACE
 * Ensure uploadedFiles is an array of Files for multiple image support
 */
export interface OrderState {
  selectedBanner: number;
  selectedSticker: number;
  width: string;
  length: string;
  description: string;
  deliveryMethod: "pickup" | "delivery";
  activeBank: string | null;
  deliveryAddress: string;
  deliveryPhone: string;
  deliveryLandmark: string;
  locationCoords: { lat: number; lng: number } | null;
  uploadedFiles: File[]; // Crucial for "1st Free, others Extra" logic
}
