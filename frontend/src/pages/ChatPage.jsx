// src/pages/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socketService from "../services/socketService";
import userService from "../services/userService";
import MessageBubble from "../components/contacts/MessageBubble";
import "./ChatPage.css";
import messageService from "../services/messageService";
import { Paperclip } from "lucide-react";
import supabaseService from "../services/supabaseService";
import Loading from "../components/utils/Loading";

const ChatPage = () => {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);

  const messages = useRef([]);
  const [input, setInput] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [, forceRender] = useState(0);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // 👈 new loading state

  const conversationId = [currentUser._id, userId].sort().join("_");
  const messagesContainerRef = useRef(null);

  // 🔹 Fetch initial messages + partner info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        const partner = allUsers.find((u) => u._id === userId);
        setChatUser(partner);

        const initialMsgs = await messageService.getMessages(conversationId, { limit: 20 });
        messages.current = initialMsgs;
        setHasMore(initialMsgs.length === 20);
        forceRender((p) => p + 1);
      } catch (err) {
        console.error("Error fetching chat user/messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // 🔹 Live socket updates
  useEffect(() => {
    if (!currentUser) return;

    socketService.joinConversation(currentUser._id, userId);

    socketService.on("private_message", (msg) => {
      messages.current = [...messages.current, msg];
      forceRender((p) => p + 1);
      scrollToBottom();
    });

    return () => {
      socketService.off("private_message");
    };
  }, [currentUser, userId]);

  // 🔹 Scroll to bottom helper
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // 🔹 Load older messages when scrolling to top
  const loadOlderMessages = async () => {
    if (loadingOlder || !hasMore) return;
    setLoadingOlder(true);

    const firstMsg = messages.current[0];
    if (!firstMsg) return;

    try {
      const olderMsgs = await messageService.getMessages(conversationId, {
        limit: 20,
        before: firstMsg._id,
      });

      if (olderMsgs.length === 0) {
        setHasMore(false);
      } else {
        messages.current = [...olderMsgs, ...messages.current];
        forceRender((p) => p + 1);

        if (messagesContainerRef.current) {
          const container = messagesContainerRef.current;
          container.scrollTop = container.scrollHeight / 3;
        }
      }
    } catch (err) {
      console.error("Error loading older messages:", err);
    } finally {
      setLoadingOlder(false);
    }
  };

  // 🔹 Attach scroll listener
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0) {
        loadOlderMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingOlder]);

  // 🔹 File handling
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const clearPreview = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  // 🔹 Send message
  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    let attachments = [];

    if (file) {
      try {
        const path = await supabaseService.uploadFile(file);
        const url = supabaseService.getPublicUrl(path);
        attachments.push({
          url,
          type: file.type,
          name: file.name,
        });
      } catch (err) {
        console.error("File upload failed:", err.message);
      }
    }

    const newMsg = {
      from: currentUser._id,
      to: userId,
      text: input,
      attachments,
    };

    socketService.sendMessage(newMsg, (ack) => {
      if (!ack.ok) console.error("Message failed:", ack.error);
      clearPreview();
    });

    setInput("");
    scrollToBottom();
  };

  // 🔹 Show loading screen first
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="chatpage-container">
      <div className="chatpage-header">{chatUser ? chatUser.name : "Chat"}</div>

      <div className="messages" ref={messagesContainerRef}>
        {loadingOlder && <div className="loading">Loading older messages...</div>}
        {messages.current.map((msg) => (
          <MessageBubble
            key={msg._id}
            text={msg.text}
            from={msg.from}
            attachments={msg.attachments || []}
            currentUserId={currentUser._id}
          />
        ))}
      </div>

      {previewUrl && (
        <div className="chatpage-preview">
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt="preview" className="chat-preview-image" />
          ) : file.type.startsWith("video/") ? (
            <video src={previewUrl} className="chat-preview-video" muted controls width={100} />
          ) : (
            <div className="chat-preview-file">📎 {file.name}</div>
          )}
          <button onClick={clearPreview} className="chat-preview-remove">
            ✕
          </button>
        </div>
      )}

      <div className="chatpage-input">
        <label htmlFor="file-input" className="file-upload-label">
          <Paperclip size={22} />
        </label>
        <input id="file-input" type="file" onChange={handleFileChange} style={{ display: "none" }} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
