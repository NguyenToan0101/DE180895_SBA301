import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BannerCarousel from "./components/BannerCarousel";
import MainLayout from "./components/MainLayout";
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
      <BannerCarousel />
      
      <Routes>
        {/* Layout Route - MainLayout sẽ wrap các child routes */}
        <Route element={<MainLayout user={user} setUser={setUser} onLogout={handleLogout} />}>
          <Route path="/" element={<Orchid orchidList={OrchidsData} />} />
          <Route path="/orchid/:id" element={<OrchidDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Login route không dùng MainLayout */}
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
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
