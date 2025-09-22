// src/services/socketService.js
import { io } from "socket.io-client";

class SocketService {
  socket = null;

  // ✅ Connect and authenticate
  connect(userId) {

      if (this.socket) {
        console.log("⚡ Socket already connected:", this.socket.id);
        return;
      }

    this.socket = io(import.meta.env.VITE_SERVER_URL || "http:/localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    console.log(this.socket);
    

    this.socket.on("connect", () => {
      console.log("⚡ Connected to socket:", this.socket.id);
      this.authenticate(userId);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket");
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    this.socket.on("connect_failed", () => {
      console.error("❌ Connection failed");
    });

  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // ✅ Authentication event
  authenticate(userId) {
    if (this.socket) {
      this.socket.emit("authenticate", userId);
    }
  }

  // ✅ Join a conversation
  joinConversation(userA, userB) {
    if (this.socket) {
      this.socket.emit("join_conversation", { userA, userB });
      console.log("room created!");
      
    }
  }

  // ✅ Send message
  sendMessage(message, ackCallback) {
    console.log("sending...");
    
    if (this.socket) {
      this.socket.emit("private_message", message, ackCallback);
    }
  }

  // ✅ Add listener
  on(event, handler) {
    if (this.socket) {
      this.socket.on(event, handler);
    }
  }

  // ✅ Remove listener
  off(event, handler) {
    if (this.socket) {
      this.socket.off(event, handler);
    }
  }

  
}

// Export singleton
const socketService = new SocketService();
export default socketService;
