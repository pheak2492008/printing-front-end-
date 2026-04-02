import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, Loader2, PartyPopper } from "lucide-react";
// 1. Import your Auth Context hook
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // 2. Get the login function from context

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const isNewlyRegistered = location.state?.fromRegister;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        // 3. Call login() from context.
        // This updates the global state and re-renders the App!
        login(data.token);

        // 4. Check if the user was trying to go to /order before logging in
        const origin = location.state?.from || "/order";
        navigate(origin);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* ... Your existing JSX remains the same ... */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="bg-[#22d3ee] p-8 pb-12 text-white relative">
          <h1 className="text-4xl font-serif font-medium leading-tight">
            Login to account
          </h1>
        </div>

        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] relative">
          {isNewlyRegistered && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-sm font-bold flex items-center gap-3 animate-bounce">
              <PartyPopper className="text-emerald-500" />
              <span>Registration Successful! Please login.</span>
            </div>
          )}

          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome back!
          </h2>
          <p className="text-slate-400 text-sm mb-8">
            Access the printing portal
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-500 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 w-5 h-5" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full py-3 pl-12 pr-10 bg-gray-50 border rounded-xl"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 w-5 h-5" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full py-3 pl-12 pr-10 bg-gray-50 border rounded-xl"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#22d3ee] text-white font-bold py-4 rounded-2xl shadow-lg mt-4 flex items-center justify-center gap-2 transition-all active:scale-95 hover:bg-[#06b6d4]"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <a href="/register" className="text-cyan-500 font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
