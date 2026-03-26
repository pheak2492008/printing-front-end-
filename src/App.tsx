import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // Import the provider
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
