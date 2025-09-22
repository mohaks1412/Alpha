import axios from "axios";
import { store } from "../store/store";
import { logoutUser } from "../store/authSlice";

class MessageService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL + "/messages",
      withCredentials: true, // so cookie-based auth works
    });
  }

  // -------------------- GET MESSAGES --------------------
  async getMessages(conversationId, { limit = 20, before } = {}) {
    try {
      const params = {};
      if (limit) params.limit = limit;
      if (before) params.before = before;

      const { data } = await this.api.get(`/${conversationId}`, { params });
      
      return data;
    } catch (err) {
      console.error("Get messages error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- MARK DELIVERED --------------------
  async markDelivered(conversationId) {
    try {
      const { data } = await this.api.patch(`/${conversationId}/delivered`);
      return data;
    } catch (err) {
      console.error("Mark delivered error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- MARK READ --------------------
  async markRead(conversationId) {
    try {
      const { data } = await this.api.patch(`/${conversationId}/read`);
      return data;
    } catch (err) {
      console.error("Mark read error:", err);
      throw err.response?.data || err;
    }
  }

  // -------------------- DELETE --------------------
  async deleteMessage(messageId) {
    try {
      const { data } = await this.api.delete(`/${messageId}`);
      return data;
    } catch (err) {
      console.error("Delete message error:", err);
      throw err.response?.data || err;
    }
  }
}

export default new MessageService();
