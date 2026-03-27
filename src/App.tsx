import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";

// This small sub-component handles the hiding logic
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Define paths where the Navbar should NOT show
  // This uses .startsWith because details usually have IDs (e.g., /detail/1)
  const hideNavbar = location.pathname.startsWith("/detail");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <LanguageProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
