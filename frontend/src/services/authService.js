// src/services/authService.js
import axios from "axios";
import { store } from "../store/store";
import { loginUser, logoutUser } from "../store/authSlice";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });
  }

  // -------------------- REGISTER --------------------
  async register({ name, email, password, phone }) {
    try {
      const { data } = await this.api.post("/auth/register", {
        name,
        email,
        password,
        phone,
      });
      store.dispatch(loginUser(data));
      return data;
    } catch (err) {
      console.error("Register error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- LOGIN --------------------
  async loginWithEmail({ email, password }) {
    try {
      const { data } = await this.api.post("/auth/emailLogin", { email, password });
      store.dispatch(loginUser(data));
      return data;
    } catch (err) {
      console.error("Login error:", err);
      throw err.response?.data || err;
    }
  }

  async loginWithPhone({ phone, password }) {
    try {
      const { data } = await this.api.post("/auth/phoneLogin", { phone, password });
      store.dispatch(loginUser(data));
      return data;
    } catch (err) {
      console.error("Phone login error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- SOCIAL SIGNINS --------------------
  async socialSignin(provider, credential) {
    try {
      const { data } = await this.api.post(`/auth/socialAuth`, { credential });
      store.dispatch(loginUser(data));
      console.log(data);
      
      return data;
    } catch (err) {
      console.error(`${provider} Sign-in error:`, err.response?.data || err.message);
      throw err.response?.data || { message: "Sign-in failed" };
    }
  }

  // -------------------- SESSION / LOGOUT --------------------
  async getCurrentUser() {
    try {
      const { data } = await this.api.get("/auth/me");
      store.dispatch(loginUser({ user: data.user, needsPhone: data.needsPhone }));
      return data;
    } catch (err) {
      console.error("Fetch current user failed:", err);
      store.dispatch(logoutUser());
      return null;
    }
  }

  async logout() {
    try {
      await this.api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout request failed, clearing locally");
    }
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

export default new AuthService();
