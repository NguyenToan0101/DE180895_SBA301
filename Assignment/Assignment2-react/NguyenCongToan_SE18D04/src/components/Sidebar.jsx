import "../styles/Sidebar.css";
import useAuth from "../stores/useAuth";
import { getSidebarIcon } from "./SidebarIcons";

const allMenuItems = [
  { id: "dashboard", label: "Dashboard", roles: ["admin", "staff"] },
  { id: "news", label: "News", roles: ["staff"] },
  { id: "category", label: "Category", roles: ["staff"] },
  { id: "tags", label: "Tags", roles: ["staff"] },
  { id: "users", label: "Users", roles: ["admin"] },
  { id: "profile", label: "Profile", roles: ["staff"] },
  { id: "history", label: "News History", roles: ["staff"] },
];

function Sidebar({ activeTab, onTabChange }) {
  const { user } = useAuth();
  const userRole = user?.accountRole === 1 ? "admin" : "staff";
  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));

  return (
    <nav className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg className="sidebar-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#sidebar-logo-grad)" />
            <path d="M16 6v4M16 22v4M6 16h4M22 16h4M9.17 9.17l2.83 2.83M20 20l2.83 2.83M9.17 22.83l2.83-2.83M20 12l2.83-2.83" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.8" fill="none" />
            <defs>
              <linearGradient id="sidebar-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="sidebar-logo-text">Điều hướng</span>
        </div>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const IconComponent = getSidebarIcon(item.id);
          return (
            <li key={item.id}>
              <button
                className={`menu-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => onTabChange(item.id)}
              >
                <span className="menu-icon">
                  <IconComponent />
                </span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
