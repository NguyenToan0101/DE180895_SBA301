import useLogin from "../hooks/useLogin";
import "./Login.css";

function LoginPage({ onLogin }) {
  const {
    formState,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    handleReset,
  } = useLogin(onLogin);

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-container">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="header-icon">📰</div>
            <h1>FUNewsManagement</h1>
            <p>Quản lý tin tức nội bộ</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="login-form">
            {error && (
              <div className="alert-error">
                <span className="alert-icon">⚠️</span>
                <div>
                  <strong>Lỗi đăng nhập</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Identifier */}
            <div className="form-group">
              <label htmlFor="identifier" className="form-label">
                <span className="label-icon">👤</span>
                Tên đăng nhập hoặc Email
              </label>
              <div className="input-wrapper">
                <input
                  id="identifier"
                  type="text"
                  name="identifier"
                  className={`form-control ${
                    formState.errors.identifier ? "error" : ""
                  }`}
                  placeholder="admin hoặc admin@fun.edu.vn"
                  value={formState.identifier}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              {formState.errors.identifier && (
                <span className="error-text">
                  {formState.errors.identifier}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Mật khẩu
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className={`form-control ${
                    formState.errors.password ? "error" : ""
                  }`}
                  placeholder="Nhập mật khẩu của bạn"
                  value={formState.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              {formState.errors.password && (
                <span className="error-text">
                  {formState.errors.password}
                </span>
              )}
            </div>

            {/* Demo Info */}
            {/* <div className="demo-box">
              <div className="demo-header">
                <span>💡</span>
                <strong>Tài khoản demo</strong>
              </div>
              <div className="demo-content">
                <div className="demo-item">
                  <span className="demo-role">Admin</span>
                  <code>Admin</code> / <code>Admin</code>
                </div>
                <div className="demo-item">
                  <span className="demo-role">Staff</span>
                  <code>Staff</code> / <code>Staff</code>
                </div>
              </div>
            </div> */}

            {/* Buttons */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    <span>Đăng nhập</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-cancel"
                onClick={handleReset}
                disabled={isLoading}
              >
                <span>✕</span>
                <span>Hủy</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
