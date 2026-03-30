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
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";
import OrderPage from "./pages/Order/orderPage";
import FAQ from "./pages/Faq/faqPage";
import ProfilePage from "./pages/Profile/profileUser";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // These pages will NOT show the global Navbar or Footer
  const isFullScreen =
    path === "/login" || path === "/register" || path === "/profile";

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9f8]">
      {!isFullScreen && <Navbar />}

      <main className={isFullScreen ? "w-full" : "w-full pt-20"}>
        {children}
      </main>

      {!isFullScreen && <Footer />}
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
