import React, { useState } from "react";
import "./LoginTabs.css";

const LoginTabs = ({ onEmailLogin, onPhoneLogin }) => {
  const [activeTab, setActiveTab] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "email") {
      onEmailLogin({ email: formData.email, password: formData.password });
    } else {
      onPhoneLogin({ phone: formData.phone, password: formData.password });
    }
  };

  return (
    <div className="login-container">
      <div className="tabs">
        <button
          className={activeTab === "email" ? "tab active" : "tab"}
          onClick={() => setActiveTab("email")}
        >
          Email
        </button>
        <button
          className={activeTab === "phone" ? "tab active" : "tab"}
          onClick={() => setActiveTab("phone")}
        >
          Phone
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {activeTab === "email" && (
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}

        {activeTab === "phone" && (
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginTabs;
