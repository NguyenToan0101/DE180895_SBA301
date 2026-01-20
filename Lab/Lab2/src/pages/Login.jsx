import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/UseLogin";
import "../pages/Login.css";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const {
    email,
    password,
    errors,
    state,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin(setUser);



  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={handleEmailChange}
          disabled={state.isLoading}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          disabled={state.isLoading}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        {state.error && <span className="error">{state.error}</span>}

        <div className="button-group">
          <button type="submit" disabled={state.isLoading}>
            {state.isLoading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/")}
            disabled={state.isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
