import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS, type OrderState } from "../../components/orderTypes";
import OrderForm from "../../components/OrderForm";
import OrderSidebar from "../../components/OrderSidebar";
import PaymentScreen from "../Order/PaymentScreen";

export default function OrderPage() {
  const { lang } = useLanguage();
  const tx = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en;

  const [state, setState] = useState<OrderState>({
    selectedBanner: 0,
    selectedSticker: 0,
    width: "1.0",
    length: "2.0",
    description: "",
    deliveryMethod: "pickup",
    activeBank: null,
    deliveryAddress: "",
    deliveryPhone: "",
    deliveryLandmark: "",
    locationCoords: null,
    uploadedFiles: [], // 1. Added this to track images
  });

  const [showPayment, setShowPayment] = useState(false);

  // 2. Updated Calculation Logic
  const DELIVERY_FEE = state.deliveryMethod === "delivery" ? 2.0 : 0;

  // Logic: First image is free, others are $1.00 each
  const fileCount = state.uploadedFiles?.length || 0;
  const extraFileFee = Math.max(0, fileCount - 1) * 1.0;

  // Calculate base price + delivery + extra image fees
  const total = (
    parseFloat(state.width || "0") * parseFloat(state.length || "0") * 2.01 +
    DELIVERY_FEE +
    extraFileFee
  ) // 3. Added the fee here
    .toFixed(2);

  const handleConfirm = () => {
    if (state.activeBank === "CASH") {
      alert("Order confirmed! Please pay on pickup.");
    } else {
      setShowPayment(true);
    }
  };

  if (showPayment && state.activeBank && state.activeBank !== "CASH") {
    return (
      <PaymentScreen
        bank={state.activeBank}
        total={total}
        tx={tx as typeof TRANSLATIONS.en}
        onBack={() => setShowPayment(false)}
        onDone={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="bg-[#fcfcfb] min-h-screen pb-20 pt-10 px-4 md:px-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <OrderForm
          tx={tx as typeof TRANSLATIONS.en}
          state={state}
          setState={setState}
        />
        <OrderSidebar
          tx={tx as typeof TRANSLATIONS.en}
          state={state}
          setState={setState}
          total={total} // This now passes the dynamic total including image fees
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
