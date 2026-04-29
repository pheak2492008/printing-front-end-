import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function PaymentScreen({ total, state, onBack, onDone }: any) {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFinalSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    // 1. Mapping to Java @RequestParams
    formData.append("fullName", state.fullname || "Guest");
    formData.append("phoneNumber", state.deliveryPhone || "000");
    formData.append("width", parseFloat(state.width || 0).toString());
    formData.append("length", parseFloat(state.length || 0).toString());

    // 2. Material Logic (Matches your DB IDs)
    // If selectedBanner is -1, it means they chose a sticker.
    const mId = state.selectedBanner !== -1 ? 1 : 2;
    formData.append("materialId", mId.toString());

    formData.append("inkChoice", state.inkChoice || "Standard");
    formData.append("dpiQuality", "720dpi");
    formData.append("hasGrommets", "false");
    formData.append("hasHems", "false");
    formData.append("description", state.description || "No description");

    // 3. File Handling
    if (state.uploadedFiles && state.uploadedFiles[0]) {
      formData.append("file", state.uploadedFiles[0]);
    }

    try {
      // ✅ FIX: Added /v1 to the URL to match your Spring Boot logs
      const response = await fetch(
        "http://localhost:8082/api/v1/orders/create",
        {
          method: "POST",
          body: formData,
          // Note: Do NOT set Content-Type header manually when using FormData
        },
      );

      if (response.ok) {
        setConfirmed(true);
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(`Server Error: ${response.status}. Check Java logs.`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network Error: Is the Spring Boot app running at localhost:8081?");
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your component (UI code) remains the same
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
          className="mt-10 px-10 py-4 bg-blue-600 text-white font-black rounded-2xl"
        >
          CONTINUE
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-4xl p-8 shadow-2xl text-center">
        <h3 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          Total Amount
        </h3>
        <p className="text-5xl font-black text-slate-900 mt-2 mb-8">${total}</p>
        <div className="bg-slate-900 p-6 rounded-3xl mb-8">
          <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-black">
              KHQR
            </div>
          </div>
        </div>
        <button
          onClick={handleFinalSubmit}
          disabled={loading}
          className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center gap-3"
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
