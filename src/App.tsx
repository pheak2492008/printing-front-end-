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

// Pages - Ensure these folder/file names match your folders EXACTLY (Case-Sensitive)
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";
import OrderPage from "./pages/Order/orderPage";
import FAQ from "./pages/Faq/faqPage";
import RatingPage from "./pages/Home/rating";

/**
 * LayoutWrapper handles the logic for showing/hiding Navbar and Footer
 * based on the current URL path.
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // Define pages where Navbar/Footer should be hidden
  const isAuthPage = path === "/login" || path === "/register";

  // Define pages where we want 0 padding-top (usually for Hero sections)
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

              {/* Redirect any unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
