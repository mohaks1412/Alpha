// socket.js
import Message from "./models/Message.js";
import { convoId } from "./utils/convoId.js";

const onlineUsers = new Map();

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    // ✅ User authenticates after connection
    socket.on("authenticate", (userId) => {
      socket.userId = userId;
      onlineUsers.set(userId, socket.id);

      // join personal room
      socket.join(`user_${userId}`);
      console.log(`✅ User ${userId} authenticated on socket ${socket.id}`);
    });

    // ✅ Join conversation
    socket.on("join_conversation", ({ userA, userB }) => {
      const conversationId = convoId(userA, userB);
      console.log(conversationId);
      
      socket.join(`convo_${conversationId}`);
    });

    // ✅ Private message
    socket.on("private_message", async (payload, ack) => {
      try {
        const { from, to, text, attachments } = payload;
        console.log(payload);
        
        const conversationId = convoId(from, to);

        const msg = await Message.create({
          conversationId,
          from,
          to,
          text,
          attachments,
        });

        console.log(msg);
        

        // emit to both participants
        io.to(`user_${to}`).emit("private_message", msg);
        io.to(`user_${from}`).emit("private_message", msg);

        if (ack) ack({ ok: true, messageId: msg._id });
      } catch (err) {
        console.error(err);
        if (ack) ack({ ok: false, error: err.message });
      }
    });

    // ✅ Disconnect
    socket.on("disconnect", () => {
      if (socket.userId) onlineUsers.delete(socket.userId);
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
}
