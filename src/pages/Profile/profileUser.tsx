import { useState, useRef } from "react";
import { useLanguage, type LangKey } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  Camera,
  MapPin,
  Image as ImageIcon,
  ArrowLeft,
  XCircle,
  FileText,
  ExternalLink,
} from "lucide-react";

const mockOrders = [
  {
    id: "#ORD-2026-9921",
    date: "Mar 28, 2026",
    status: "In Production",
    items: 2,
    total: "$45.00",
    color: "#3b82f6",
    detail: "Vinyl Sticker Printing - Matte Finish (500pcs)",
  },
  {
    id: "#ORD-2026-9845",
    date: "Mar 15, 2026",
    status: "Delivered",
    items: 1,
    total: "$12.50",
    color: "#22c55e",
    detail: "Custom Business Cards - Premium Silk (100pcs)",
  },
  {
    id: "#ORD-2026-9701",
    date: "Feb 22, 2026",
    status: "Cancelled",
    items: 5,
    total: "$120.00",
    color: "#ef4444",
    detail: "Outdoor PVC Banner - 2x3m with Eyelets",
  },
];

export default function ProfileUser() {
  const { lang, setLang } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<
    "orders" | "settings" | "language"
  >("orders");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    name: "Sok Samnang",
    email: "sok.samnang@email.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
  });

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      type === "profile" ? setProfileImg(url) : setCoverImg(url);
    }
  };

  const translations = {
    en: {
      orders: "My Orders",
      settings: "Settings",
      lang: "Language",
      logout: "Logout",
      edit: "Edit",
      save: "Save",
    },
    km: {
      orders: "ការបញ្ជាទិញ",
      settings: "ការកំណត់",
      lang: "ភាសា",
      logout: "ចាកចេញ",
      edit: "កែប្រែ",
      save: "រក្សាទុក",
    },
    zh: {
      orders: "我的订单",
      settings: "账户设置",
      lang: "语言选择",
      logout: "登出",
      edit: "编辑",
      save: "保存",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#FBFAFA] font-sans pb-20">
      {/* COVER */}
      <div className="relative h-64 md:h-80 bg-slate-900 group overflow-hidden">
        {coverImg ? (
          <img
            src={coverImg}
            className="w-full h-full object-cover"
            alt="cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 opacity-90" />
        )}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-30 p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 border border-white/20"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => coverInputRef.current?.click()}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-lg text-white rounded-xl text-xs font-bold border border-white/10"
        >
          <ImageIcon size={14} /> Change Cover
        </button>
        <input
          type="file"
          ref={coverInputRef}
          hidden
          onChange={(e) => handleFile(e, "cover")}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <div className="relative -mt-16 flex flex-col md:flex-row items-center md:items-end gap-6 mb-12">
          <div className="relative">
            <div className="w-36 h-36 rounded-[2.5rem] border-[6px] border-[#FBFAFA] bg-white shadow-2xl overflow-hidden flex items-center justify-center">
              {profileImg ? (
                <img src={profileImg} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center text-4xl font-black text-white">
                  SS
                </div>
              )}
            </div>
            <button
              onClick={() => profileInputRef.current?.click()}
              className="absolute bottom-1 right-1 p-3 bg-blue-600 text-white rounded-2xl shadow-xl border-4 border-[#FBFAFA] hover:scale-110 transition-transform"
            >
              <Camera size={18} />
            </button>
            <input
              type="file"
              ref={profileInputRef}
              hidden
              onChange={(e) => handleFile(e, "profile")}
            />
          </div>
          <div className="flex-1 text-center md:text-left pb-2">
            <h1 className="text-3xl font-black text-slate-900">
              {userData.name}
            </h1>
            <p className="text-slate-500 text-sm font-medium flex items-center justify-center md:justify-start gap-1">
              <MapPin size={14} className="text-blue-500" /> {userData.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <div className="lg:w-1/4">
            <div className="bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-1">
              {[
                { id: "orders", icon: <Package size={18} />, label: t.orders },
                {
                  id: "settings",
                  icon: <Settings size={18} />,
                  label: t.settings,
                },
                { id: "language", icon: <Globe size={18} />, label: t.lang },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeSection === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  <div className="flex items-center gap-4">
                    {item.icon} {item.label}
                  </div>
                  <ChevronRight
                    size={14}
                    className={
                      activeSection === item.id ? "opacity-100" : "opacity-0"
                    }
                  />
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-slate-50">
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={18} /> {t.logout}
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:w-3/4">
            {activeSection === "orders" && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black">{t.orders}</h2>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full uppercase tracking-widest">
                    {mockOrders.length} Total
                  </span>
                </div>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="group cursor-pointer bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-blue-500 hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50">
                          <Package
                            className="text-slate-400 group-hover:text-blue-600"
                            size={24}
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                            {order.id}
                          </h4>
                          <p className="text-slate-400 text-sm font-medium">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-lg text-slate-900">
                          {order.total}
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
                          style={{ color: order.color }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: order.color }}
                          />
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black">{t.settings}</h2>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`px-8 py-3 rounded-2xl font-black transition-all ${editMode ? "bg-green-600 text-white shadow-lg shadow-green-100" : "bg-slate-900 text-white"}`}
                  >
                    {editMode ? t.save : t.edit}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(userData).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
                        {key}
                      </label>
                      <input
                        disabled={!editMode}
                        value={value}
                        onChange={(e) =>
                          setUserData({ ...userData, [key]: e.target.value })
                        }
                        className={`w-full px-6 py-4 rounded-2xl border-2 transition-all font-bold ${editMode ? "border-blue-100 focus:border-blue-600" : "border-slate-50 bg-slate-50 text-slate-500"}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "language" && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-in fade-in duration-500">
                <h2 className="text-2xl font-black mb-8">{t.lang}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "English", code: "en", flag: "🇺🇸" },
                    { name: "Khmer", code: "km", flag: "🇰🇭" },
                    { name: "Chinese", code: "zh", flag: "🇨🇳" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code as LangKey)}
                      className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all ${lang === l.code ? "border-blue-500 bg-blue-50" : "border-slate-50 hover:border-slate-200"}`}
                    >
                      <span className="text-4xl">{l.flag}</span>
                      <span className="font-black text-slate-700">
                        {l.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-[3rem] p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Order Information
                </h3>
                <p className="text-blue-600 font-bold">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <XCircle size={24} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-slate-500 font-medium">
                    Order Status
                  </span>
                  <span
                    className="font-black uppercase text-[11px] tracking-widest px-3 py-1 rounded-full bg-white shadow-sm"
                    style={{ color: selectedOrder.color }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-slate-900">
                    {selectedOrder.total}
                  </span>
                </div>
                <p className="text-slate-600 text-sm italic">
                  {selectedOrder.detail}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all">
                  <FileText size={18} /> Invoice
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  <ExternalLink size={18} /> Track
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
