import { useReducer, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginReducer from "../stores/login/loginReducer";
import { UserContext } from "../stores/UserContext";

const MOCK_USER = {
  email: "admin",
  password: "123456",
};

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export function useLogin(setUser) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const navigate = useNavigate();
  const { setUser: setContextUser } = useContext(UserContext);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Username không được để trống";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Username không được để trống" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password không được để trống" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Dispatch LOGIN_REQUEST
    dispatch({ type: "LOGIN_REQUEST" });

    // Giả lập delay để gọi API
    setTimeout(() => {
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        const userData = {
          name: "Admin",
          avatar: "https://i.pravatar.cc/40",
        };

        // Dispatch LOGIN_SUCCESS
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: userData,
        });

        setUser(userData);
        setContextUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Đăng nhập thành công!");

        // Chờ 1.5s rồi chuyển trang
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        // Dispatch LOGIN_FAILURE
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Email hoặc mật khẩu không đúng",
        });

        toast.error("Email hoặc mật khẩu không đúng");
      }
    }, 500);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    email,
    password,
    errors,
    state,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleLogout,
  };
}
