import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BannerCarousel from "./components/BannerCarousel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";
import OrchidDetail from "./components/OrchidDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import { OrchidsData } from "./data/ListOfOrchidss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  // Lấy user từ localStorage khi app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer
        position="top-right"
        autoClose={1500}   // 1.5 giây
        hideProgressBar
      />
      {location.pathname === "/" && <BannerCarousel />}
      <Header user={user} setUser={setUser} onLogout={handleLogout} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Orchid orchidList={OrchidsData} />} />
          <Route path="/orchid/:id" element={<OrchidDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </main>

      <Footer
        avatar="./images/anhthe.png"
        name="Nguyễn Công Toàn"
        email="toan20171020@gmail.com"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
