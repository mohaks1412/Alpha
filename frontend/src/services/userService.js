// src/services/userService.js
import axios from "axios";
import { loginUser, logoutUser } from "../store/authSlice";
import store from "../store/store"


class UserService {

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true,
    });
  }

  // -------------------- FETCH USERS --------------------
  async getAllUsers() {
    try {
      const { data } = await this.api.get("/users"); // or /users if backend changes
      return data;
    } catch (err) {
      console.error("Error fetching users:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- UPDATE USER --------------------
  async updateUser(id, userData) {
    try {
      const { data } = await this.api.put(`/users/${id}`, userData);
      console.log(data);
      
      store.dispatch(loginUser({ user: data }));

      return data;

    } catch (err) {
      console.error("Update user error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- DELETE USER --------------------
  async deleteUser(id) {
    try {
      const { data } = await this.api.delete(`/users/${id}`);
      store.dispatch(logoutUser());
      return data;
    } catch (err) {
      console.error("Delete user error:", err);
      throw err.response?.data || err;
    }
  }
}

export default new UserService();
