import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

/* 1. CONFIGURATION - Use Vite ENV variable */
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

export default function PaymentScreen({ total, state, onBack, onDone }: any) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFinalSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    // Mapping state to the exact @RequestParams in your Java Controller
    formData.append("fullName", state.fullname || "Guest");
    formData.append("phoneNumber", state.deliveryPhone || "000");

    // Ensure numeric values are sent as strings
    formData.append("width", parseFloat(state.width).toString());
    formData.append("length", parseFloat(state.length).toString());

    // Logic: 1 for Banner, 2 for Sticker (Matches your material IDs)
    const mId = state.selectedBanner !== -1 ? 1 : 2;
    formData.append("materialId", mId.toString());

    formData.append("inkChoice", state.inkChoice || "Standard");
    formData.append("dpiQuality", "720dpi");
    formData.append("hasGrommets", state.hasGrommets ? "true" : "false");
    formData.append("hasHems", state.hasHems ? "true" : "false");

    // Add description so users can order without an image
    formData.append("description", state.description || "");

    // Only append file if the user actually uploaded one
    if (state.uploadedFiles && state.uploadedFiles[0]) {
      formData.append("file", state.uploadedFiles[0]);
    }

    try {
      /** * FIX: Added "/v1" to the URL path.
       * Your SecurityConfig.java allows "/api/v1/orders/create"
       * but blocks "/api/orders/create" for unauthenticated users.
       */
      const response = await fetch(`${API_BASE_URL}/api/v1/orders/create`, {
        method: "POST",
        body: formData,
        // Note: Do NOT set Content-Type header manually when sending FormData;
        // the browser will set it automatically with the boundary string.
      });

      if (response.ok) {
        setConfirmed(true);
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(`Order failed: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert(`Network Error: Connection to ${API_BASE_URL} failed.`);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50 p-6 text-center">
        <CheckCircle2
          size={100}
          className="text-emerald-500 mb-6 animate-bounce"
        />
        <h2 className="text-4xl font-black text-white italic">SUCCESS!</h2>
        <p className="text-slate-400 mt-2">
          Order sent to the Admin Dashboard.
        </p>
        <button
          onClick={onDone}
          className="mt-10 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl transition-transform active:scale-95"
        >
          CONTINUE
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-2xl text-center">
        <button
          onClick={onBack}
          className="text-slate-400 text-sm font-bold mb-4 block mx-auto hover:text-slate-600"
        >
          ← GO BACK
        </button>

        <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          Total Amount
        </h3>
        <p className="text-5xl font-black text-slate-900 mt-2 mb-8">${total}</p>

        {/* KHQR Placeholder Section */}
        <div className="bg-slate-900 p-6 rounded-3xl mb-8 border-4 border-slate-800">
          <div className="aspect-square bg-white rounded-xl flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xs mb-2">
              KHQR
            </div>
            <p className="text-[8px] text-slate-400 font-bold">SCAN TO PAY</p>
          </div>
        </div>

        <button
          onClick={handleFinalSubmit}
          disabled={loading}
          className={`w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> SENDING...
            </>
          ) : (
            "I HAVE PAID ✓"
          )}
        </button>
      </div>
    </div>
  );
}
