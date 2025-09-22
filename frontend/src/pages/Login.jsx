import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/auth/LoginTabs";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import authService from "../services/authService";
import "./Login.css";

const Login = () => {
  // Handlers for tab login
  const navigate = useNavigate();
  const handleEmailLogin = async ({ email, password }) => {
    try {
      const data = await authService.loginWithEmail({ email, password });
      console.log("Logged in with email:", email);
      console.log(data);
      
      navigate("/")
    } catch (err) {
      console.error("Email login failed:", err);
    }
  };

  const handlePhoneLogin = async ({ phone, password }) => {
    try {
      await authService.loginWithPhone({ phone, password });
      console.log("Logged in with phone:", phone);
    } catch (err) {
      console.error("Phone login failed:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login with your account</p>

        <LoginTabs
          onEmailLogin={handleEmailLogin}
          onPhoneLogin={handlePhoneLogin}
        />

        <div className="divider">
          <span>or continue with</span>
        </div>

        <SocialLoginButtons />

        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
