import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages

import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";
import OrderPage from "./pages/Order/orderPage";
import FAQ from "./pages/Faq/faqPage";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // 1. Only hide Navbar/Footer for Login/Register
  const isAuthPage = path === "/login" || path === "/register";

  // 2. These pages have a Hero image that should touch the Navbar (No white gap)
  const isHeroPage =
    path === "/" ||
    path === "/about" ||
    path.startsWith("/detail/") ||
    path === "/faq" ||
    path === "/order";

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9f8]">
      {/* Navbar will now show on Home, About, Detail, FAQ, and Order */}
      {!isAuthPage && <Navbar />}

      {/* - If it's a Hero page (Home/About), use 'pt-0' so they touch the Navbar.
          - If it's a standard page (Order/FAQ/Detail), use 'pt-20' so the Navbar doesn't cover text.
      */}
      <main
        className={`${isAuthPage || isHeroPage ? "w-full pt-0" : "w-full pt-20"}`}
      >
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

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
