// src/components/contacts/ContactList.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import ContactCard from "./ContactCard";
import "./ContactList.css";
import { useNavigate } from "react-router-dom";
import socketService from "../../services/socketService";
import Loading from "../utils/Loading";

const ContactList = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user); // ✅ logged-in user from redux

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  const openChat = (userId) => {
    socketService.joinConversation(currentUser._id, userId);
    navigate(`/chat/${userId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();

        // ✅ filter out current user
        const filtered = data.filter((u) => u._id !== currentUser?._id);

        setUsers(filtered);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false); // ✅ stop loader
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  if (loading) {
    return <Loading />; // ✅ show loader while fetching
  }

  return (
    <div className="contact-list-container">
      <h1 className="contact-list-title">Connect to People</h1>
      <div className="contact-list">
        {users.map((user) => (
          <ContactCard
            key={user._id}
            user={user}
            onClick={() => openChat(user._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
