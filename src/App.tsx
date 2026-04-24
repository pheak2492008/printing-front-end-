import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
// NOTE: If Render fails here, check if your folder is "Pages" or "pages"
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";
import OrderPage from "./pages/Order/orderPage";
import FAQ from "./pages/Faq/faqPage";
import RatingPage from "./pages/Home/rating";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path === "/login" || path === "/register";
  const isHeroPage =
    ["/", "/about", "/faq", "/order"].includes(path) ||
    path.startsWith("/detail/");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9f8]">
      {!isAuthPage && <Navbar />}
      <main className={`w-full ${isAuthPage || isHeroPage ? "pt-0" : "pt-20"}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/rating" element={<RatingPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
