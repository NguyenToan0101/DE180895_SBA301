import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dữ liệu login set cứng
  const MOCK_USER = {
    email: "admin",
    password: "123456",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
  const userData = {
    name: "Admin",
    avatar: "https://i.pravatar.cc/40",
  };

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  setError("");

  toast.success("Đăng nhập thành công!");

  // ⏳ chờ 1.5s rồi chuyển trang
  setTimeout(() => {
    navigate("/");
  }, 1500);

} else {
  toast.error("Email hoặc mật khẩu không đúng");
}
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <span className="error">{error}</span>}

        <div className="button-group">
          <button type="submit">Login</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
