// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import "./Profile.css";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!currentUser) return;
    setUser(currentUser);
    setForm({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || "",
    });
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log(form);
      
      const updated = await userService.updateUser(currentUser._id, form);
      setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await userService.deleteUser(currentUser._id);
        alert("Account deleted");
        // redirect or logout here
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      <div className="profile-edit">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            readOnly={!editing}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label>
          Phone No:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Optional"
            readOnly
          />
        </label>
      </div>

      {/* Action buttons */}
      <div className="profile-actions">
        {!editing ? (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button className="danger" onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
