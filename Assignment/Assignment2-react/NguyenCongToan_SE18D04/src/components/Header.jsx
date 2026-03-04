import { useNavigate } from "react-router-dom";
import useAuth from "../stores/useAuth";
import "../styles/Header.css";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="header-left">
          <div className="header-logo">
            <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#logo-grad)" />
              <path d="M12 22v-4a2 2 0 012-2h12a2 2 0 012 2v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M10 26h20a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2v-4a2 2 0 012-2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="16" r="3" stroke="white" strokeWidth="1.8" />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <h1>Admin Panel</h1>
          </div>
        </div>
        <div className="admin-user-info">
          <div className="user-avatar">
            <span>{user?.accountName?.charAt(0) || "A"}</span>
          </div>
          <div className="user-details">
            <span className="user-name">{user?.accountName || "Admin"}</span>
            <span className="user-email">{user?.accountEmail || ""}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <span className="logout-icon">🚪</span>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
