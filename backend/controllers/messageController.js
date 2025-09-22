import mongoose from "mongoose";
import Message from "../models/Message.js";
import { convoId } from "../utils/convoId.js";

// ✅ Send a new message

// ✅ Get all messages in a conversation (with pagination)
export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id; // logged-in user
    const { conversationId } = req.params;
    const { limit = 20, before } = req.query;

    // Safety check: user must be part of this conversation
    if (!conversationId.includes(userId.toString())) {
      return res.status(403).json({ error: "Not authorized for this conversation" });
    }

    const query = { conversationId };
    if (before) query._id = { $lt: new mongoose.Types.ObjectId(before) };

    const messages = await Message.find(query)
      .sort({ _id: -1 })
      .limit(parseInt(limit));

    res.json(messages.reverse()); // reverse so oldest -> newest
  } catch (err) {
    console.error("Get messages error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mark messages as delivered
export const markDelivered = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    await Message.updateMany(
      { conversationId, to: userId, delivered: false },
      { $set: { delivered: true } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Mark delivered error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Mark messages as read
export const markRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    await Message.updateMany(
      { conversationId, to: userId, read: false },
      { $set: { read: true } }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Mark read error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a message (optional)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const msg = await Message.findById(id);
    if (!msg) return res.status(404).json({ error: "Message not found" });

    if (msg.from.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not allowed to delete this message" });
    }

    await msg.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: err.message });
  }
};
