import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(true);

      // ✅ Redirect to Login after 2 seconds, passing a state
      setTimeout(() => {
        navigate("/login", { state: { fromRegister: true } });
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full py-3 pl-12 pr-10 bg-[#f8fafc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all placeholder:text-gray-300";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-xl">
        <div className="bg-[#22d3ee] p-10 pb-14 text-white relative overflow-hidden">
          <h1 className="text-3xl font-serif font-semibold relative z-10">
            Register an account
          </h1>
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-cyan-800 rounded-full opacity-30"></div>
        </div>

        <div className="p-8 -mt-8 bg-white rounded-t-[2.5rem] relative">
          <h2 className="text-2xl font-serif font-bold text-[#0a252e] mb-6">
            Sign Up
          </h2>

          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">
                Account Created!
              </h3>
              <p className="text-slate-500">Redirecting you to login...</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full name"
                  className={inputClass}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className={inputClass}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  className={inputClass}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={inputClass}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#22d3ee] hover:bg-cyan-500 disabled:opacity-70 text-white font-bold py-4 rounded-2xl shadow-lg mt-4 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-400 mt-6">
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

export default Register;
