import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getMessages,
  markDelivered,
  markRead,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

// ✅ Get all messages in a conversation
// GET /api/messages/:conversationId?limit=20&before=<timestamp>
router.get("/:conversationId", authMiddleware, getMessages);

// ✅ Mark all messages in a convo as delivered
// PATCH /api/messages/:conversationId/delivered
router.patch("/:conversationId/delivered", authMiddleware, markDelivered);

// ✅ Mark all messages in a convo as read
// PATCH /api/messages/:conversationId/read
router.patch("/:conversationId/read", authMiddleware, markRead);

// ✅ Delete a single message (only by sender)
// DELETE /api/messages/:id
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
