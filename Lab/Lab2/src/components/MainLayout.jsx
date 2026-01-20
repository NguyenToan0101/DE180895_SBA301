import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ user, setUser, onLogout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} setUser={setUser} onLogout={onLogout} />
      
      <main className="flex-grow-1">
        {/* Outlet component xác định vị trí hiển thị các Route con */}
        <Outlet />
      </main>

      <Footer
        avatar="./images/anhthe.png"
        name="Nguyễn Công Toàn"
        email="toan20171020@gmail.com"
      />
    </div>
  );
}

export default MainLayout;
