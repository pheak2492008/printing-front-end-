import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext"; // 1. Import AuthProvider

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

// Component to handle showing/hiding Nav and Footer
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const path = location.pathname;

  // Hide Nav/Footer on Login, Register, and Detail pages
  const isAuthOrDetail =
    path === "/login" || path === "/register" || path.startsWith("/detail");

  return (
    <>
      {/* 2. Navbar is now inside the AuthProvider, so it can see if user is logged in */}
      {!isAuthOrDetail && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAuthOrDetail && <Footer />}
    </>
  );
}

function App() {
  return (
    /* 3. Wrap EVERYTHING in AuthProvider first */
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/detail/:id" element={<Detail />} />

              {/* Make sure these paths match what you use in navigate() */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* The OrderPage will now correctly use the Auth State */}
              <Route path="/order" element={<OrderPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
