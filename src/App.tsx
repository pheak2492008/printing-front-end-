import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";
import About from "./pages/About/about";
// import Order from "./pages/Order/order"; // TODO: Uncomment when Order component is created

function App() {
  // Simple check for user (You can replace this with your real Auth state/Context)
  const isAuthenticated = localStorage.getItem("userToken");

  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Everyone can see these */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route Example: Order */}
          {/* <Route
            path="/order"
            element={isAuthenticated ? <Order /> : <Navigate to="/register" />}
          /> */}

          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
