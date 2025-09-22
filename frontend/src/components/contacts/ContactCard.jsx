// src/components/contacts/ContactCard.jsx
import React from "react";
import "./ContactCard.css";

/**
 * Props:
 *  - user: { _id, name, email, phone? }
 *  - onClick: function(user) // optional
 */
export default function ContactCard({ user, onClick }) {
  const handleClick = () => {
    if (onClick) onClick(user);
  };

  return (
    <button
      type="button"
      className="contact-card"
      onClick={handleClick}
      aria-label={`Open chat with ${user.name}`}
    >
      <div className="contact-info">
        <div className="contact-row">
          <span className="contact-name">{user.name}</span>
          <span className="contact-id">{user._id?.slice(0, 8)}</span>
        </div>

        <div className="contact-row">
          <span className="contact-email">{user.email}</span>
          {user.phone && <span className="contact-phone">{user.phone}</span>}
        </div>
      </div>
    </button>
  );
}
