import React, { useState } from "react";
import "./MessageBubble.css";

const MessageBubble = ({ text, from, currentUserId, attachments = [] }) => {
  const isMine = from === currentUserId;
  const [preview, setPreview] = useState(null); // store clicked image/video url

  return (
    <>
      <div className={`message-row ${isMine ? "mine" : "theirs"}`}>
        <div className={`message-bubble ${isMine ? "mine" : "theirs"}`}>
          {/* Message text */}
          {text && <div className="message-text">{text}</div>}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="attachments">
              {attachments.map((att, i) => {
                if (att.type.startsWith("image/")) {
                  return (
                    <img
                      key={i}
                      src={att.url}
                      alt={att.name}
                      className="message-image"
                      onClick={() => setPreview(att.url)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                } else if (att.type.startsWith("video/")) {
                  return (
                    <video
                      key={i}
                      src={att.url}
                      controls
                      className="message-video"
                      onClick={() => setPreview(att.url)}
                      style={{ cursor: "pointer" }}
                    />
                  );
                } else {
                  return (
                    <a
                      key={i}
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="message-file"
                    >
                      📎 {att.name}
                    </a>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {preview && (
        <div className="preview-modal" onClick={() => setPreview(null)}>
          {preview.endsWith(".mp4") || preview.includes("video") ? (
            <video src={preview} controls autoPlay className="preview-content" />
          ) : (
            <img src={preview} alt="preview" className="preview-content" />
          )}
        </div>
      )}
    </>
  );
};

export default MessageBubble;
