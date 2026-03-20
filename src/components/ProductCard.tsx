import React from "react";
import { Heart, ArrowRight, Printer } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  tag?: string;
  tagColor?: string;
  bgColor: string;
  iconBg: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  tag,
  tagColor,
  bgColor,
  iconBg,
}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Top Visual Section */}
      <div
        className={`${bgColor} p-6 h-50 relative overflow-hidden flex items-end gap-10`}
      >
        {/* Decorative Circles (SVG or Divs) */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-black/10 rounded-full" />

        {/* Heart Icon */}
        <button
          title="Add to favorites"
          className="absolute top-4 right-4 p-2 bg-black/10 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-colors"
        >
          <Heart size={18} />
        </button>

        {/* Status Tag */}
        {tag && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${tagColor}`}
          >
            {tag}
          </div>
        )}

        {/* Product Icons */}
        <div className={`${iconBg} p-2 rounded-lg border border-white/20`}>
          <Printer size={20} className="text-white" />
        </div>
        <div className="w-8 h-8 rounded-lg bg-black/20 border border-white/10" />
      </div>

      {/* Text Section */}
      <div className="p-5 flex justify-between items-end">
        <div>
          <h3 className="font-bold text-slate-800 leading-tight mb-1">
            {title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed max-w-[150px]">
            {description}
          </p>
        </div>
        <button
          title="View product details"
          className="p-2 text-cyan-400 hover:bg-cyan-50 rounded-full transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;