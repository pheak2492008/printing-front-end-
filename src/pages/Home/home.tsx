import React from "react";
import { Search, Bell, ShoppingCart, Printer } from "lucide-react";
import ProductCard from "../../components/ProductCard";

const InspirationGallery: React.FC = () => {
  const categories = [
    "All",
    "Banners",
    "Stickers",
    "Business Cards",
    "Posters",
  ];

  const products = [
    {
      title: "Vinyl Outdoor Banners",
      description: "Weather-resistant premium prints",
      tag: "Popular",
      tagColor: "bg-orange-500",
      bgColor: "bg-[#114b5f]",
      iconBg: "bg-cyan-600",
    },
    {
      title: "Branding Stickers",
      description: "Custom die-cut for any shape",
      bgColor: "bg-[#1e1b4b]",
      iconBg: "bg-indigo-600",
    },
    {
      title: "Premium Business Cards",
      description: "Luxury matte & foil options",
      tag: "New",
      tagColor: "bg-cyan-400",
      bgColor: "bg-[#064e3b]",
      iconBg: "bg-green-600",
    },
    {
      title: "Event Posters",
      description: "Large-format, vivid colour prints",
      bgColor: "bg-[#4c1d32]",
      iconBg: "bg-rose-900",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Top Navbar - Adjusted p-10 to p-5 (20px) */}
      <header className="bg-white p-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0a252e] rounded-xl flex items-center justify-center text-cyan-400">
            <Printer size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Good morning 👋</p>
            <h1 className="font-bold text-slate-800 leading-none">PrintHub</h1>
          </div>
        </div>
        <div className="flex gap-4 text-gray-400">
          <Search size={20} className="cursor-pointer hover:text-cyan-500 transition-colors" />
          <Bell size={20} className="cursor-pointer hover:text-cyan-500 transition-colors" />
          <ShoppingCart size={20} className="cursor-pointer hover:text-cyan-500 transition-colors" />
        </div>
      </header>

      {/* Hero Header - Adjusted p-8 to p-5 (20px) */}
      <section className="bg-[#0a252e] p-5 pb-14 text-white">
        <h2 className="text-4xl font-serif font-bold mb-3">
          Inspiration <br /> Gallery
        </h2>
        <p className="text-cyan-100/60 text-sm max-w-[250px] ">
          Discover premium printing solutions for your next project.
        </p>
      </section>

      {/* Main Content Area - px-6 to px-5 (20px) */}
      <main className="px-5 -mt-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-4 pl-12 pr-4 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow"
          />
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                i === 0 
                ? "bg-cyan-400 text-white shadow-md shadow-cyan-100" 
                : "bg-white text-gray-400 border border-gray-100 hover:border-cyan-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid - gap-6 to gap-5 (20px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((p, idx) => (
            <ProductCard key={idx} {...p} />
          ))}
        </div>

        {/* Custom Quote Section - p-8 to p-5 (20px) */}
        <div className="mt-10 bg-[#0a353f] p-5 py-8 rounded-[2.5rem] text-white">
          <h3 className="text-xl font-bold mb-2">Need a Custom Quote?</h3>
          <p className="text-cyan-100/60 text-xs mb-6 leading-relaxed">
            Can't find what you're looking for? We specialize in custom projects
            of all sizes.
          </p>
          <button className="w-full bg-[#22d3ee] py-4 rounded-2xl font-bold shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition-transform">
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
};

export default InspirationGallery;