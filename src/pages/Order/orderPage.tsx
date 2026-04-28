import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS, type OrderState } from "../../components/orderTypes";
import OrderForm from "../../components/OrderForm";
import OrderSidebar from "../../components/OrderSidebar";
import PaymentScreen from "../Order/PaymentScreen";

export default function OrderPage() {
  const { lang } = useLanguage();
  const tx = TRANSLATIONS[lang as keyof typeof TRANSLATIONS] ?? TRANSLATIONS.en;

  // Inside OrderPage.tsx
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
    uploadedFiles: [],
    fullname: "",

    // ADD THESE TWO LINES TO FIX THE ERROR:
    deliveryName: "", // This was missing
    inkChoice: "Eco-Solvent (Standard)", // This was missing
  });

  const [showPayment, setShowPayment] = useState(false);

  const DELIVERY_FEE = state.deliveryMethod === "delivery" ? 2.0 : 0;
  const fileCount = state.uploadedFiles?.length || 0;
  const extraFileFee = Math.max(0, fileCount - 1) * 1.0;

  const total = (
    parseFloat(state.width || "0") * parseFloat(state.length || "0") * 2.01 +
    DELIVERY_FEE +
    extraFileFee
  ).toFixed(2); //

  const handleConfirm = () => {
    if (state.activeBank === "CASH") {
      // Logic for cash could be added here
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
        state={state} // CRITICAL: Pass the state here
        tx={tx as typeof TRANSLATIONS.en}
        onBack={() => setShowPayment(false)}
        onDone={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="bg-[#fcfcfb] min-h-screen pb-20 pt-10 px-4 md:px-10">
      <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <OrderForm
          tx={tx as typeof TRANSLATIONS.en}
          state={state}
          setState={setState}
        />
        <OrderSidebar
          tx={tx as typeof TRANSLATIONS.en}
          state={state}
          setState={setState}
          total={total}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
