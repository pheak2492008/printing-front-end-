import React, { useState } from "react";
import { User, Phone, Mail, Lock, EyeOff, Eye } from "lucide-react";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full py-3 pl-12 pr-10 bg-[#f8fafc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-300";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-xl">
        {/* Dark Header Section */}
        <div className="bg-[#22d3ee] p-10 pb-14 text-white relative overflow-hidden">
          <h1 className="text-3xl font-serif font-semibold relative z-10">
            Register an account
          </h1>
          {/* Decorative Circles */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-800 rounded-full opacity-30"></div>
          <div className="absolute top-2 -right-8 w-24 h-24 border border-cyan-800 rounded-full opacity-20"></div>
        </div>

        {/* Form Section */}
        <div className="p-8 -mt-8 bg-white rounded-t-[2.5rem] relative">
          <h2 className="text-2xl font-serif font-bold text-[#0a252e] mb-6">
            Sign Up
          </h2>

          <form className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                name="fullName"
                type="text"
                placeholder="Full name"
                className={inputClass}
                onChange={handleChange}
              />
            </div>

            {/* Username */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                name="username"
                type="text"
                placeholder="Username"
                className={inputClass}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                className={inputClass}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={inputClass}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputClass}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button className="w-full bg-[#22d3ee] hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-cyan-100 mt-4 transition-all active:scale-[0.98]">
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="px-4 text-gray-400 text-xs">Or</span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-6">
            <SocialIcon bg="bg-blue-50" color="text-blue-600" label="F" />
            <SocialIcon bg="bg-orange-50" color="text-red-500" label="G" />
            <SocialIcon bg="bg-gray-50" color="text-black" label="" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-400 font-bold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({
  bg,
  color,
  label,
}: {
  bg: string;
  color: string;
  label: string;
}) => (
  <button
    className={`w-12 h-12 flex items-center justify-center rounded-xl ${bg} border border-gray-100 transition-transform hover:scale-110`}
  >
    <span className={`text-xl font-bold ${color}`}>{label}</span>
  </button>
);

export default Register;
