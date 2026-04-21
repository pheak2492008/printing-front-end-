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
// import Login from "./pages/Auth/Login"; // Import your login page

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // 1. Hide Navbar/Footer for Auth pages
  const isAuthPage =
    path === "/login" || path === "/register" || path === "/signin";

  // 2. HERO PAGES: These background colors/images should go UNDER the transparent navbar
  const isHeroPage =
    path === "/" || path === "/about" || path.startsWith("/detail/");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9f8]">
      {!isAuthPage && <Navbar />}

      <main
        className={`flex-grow w-full ${
          isAuthPage || isHeroPage ? "pt-0" : "pt-20"
        }`}
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
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/profile" element={<Profile />} /> */}

              {/* Auth Routes (Add your components here) */}
              <Route path="/signin" element={<div>Sign In Page</div>} />
              <Route path="/register" element={<div>Register Page</div>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
