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

/**
 * LayoutWrapper checks the current URL.
 * If it's a page like /profile, it hides the global Navbar and Footer.
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // List of paths where we DO NOT want the global Navbar/Footer
  const isFullScreenPage =
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/detail") ||
    path === "/profile";

  return (
    <div className="flex flex-col min-h-screen">
      {!isFullScreenPage && <Navbar />}

      {/* We remove 'pt-16' (padding top) for full-screen pages 
        so your Profile header touches the very top of the screen.
      */}
      <main className={`flex-grow ${isFullScreenPage ? "" : "pt-20"}`}>
        {children}
      </main>

      {!isFullScreenPage && <Footer />}
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
              {/* Redirect any unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
