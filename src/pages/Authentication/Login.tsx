import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const inputClass =
    "w-full py-3 pl-12 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all";

  return (
    
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="bg-[#22d3ee]  p-8 pb-12 text-white relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-800 rounded-full text-[10px] tracking-widest uppercase mb-6 text-white">
            <span className="p-1 bg-white rounded-sm">🖨️</span> Print Services
          </div>
          <h1 className="text-4xl font-serif font-medium leading-tight">
            Login to your account
          </h1>
          {/* Decorative Top Right Element */}
          <div className="absolute top-6 right-8 opacity-20 flex gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
            <div className="w-4 h-4 bg-cyan-400 rounded-sm"></div>
            <div className="w-4 h-4 bg-gray-600 rounded-sm"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome back!
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Choose your role to access the printing portal{" "}
          </p>

          <form className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                className={inputClass}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-cyan-500 text-sm font-semibold">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-[#22d3ee] hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-cyan-200 transition-all transform active:scale-[0.98]">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="px-4 text-gray-400 text-xs">or continue with</span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <SocialButton icon="facebook" />
            <SocialButton icon="google" />
            <SocialButton icon="apple" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="#" className="text-cyan-500 font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon }: { icon: string }) => (
  <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
    {/* You can replace these with actual SVGs or react-icons */}
    <span className="capitalize text-lg font-bold">
      {icon === "google" ? <span className="text-red-500">G</span> : icon[0]}
    </span>
  </button>
);

export default Login;
