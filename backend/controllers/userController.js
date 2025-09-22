
import User from "../models/User.js"
import Message from "../models/Message.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure user can only delete themselves
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete all related messages
    await Message.deleteMany({ $or: [{ from: id }, { to: id }] });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User and all related messages deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Make sure logged-in user can only update themselves
    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { name, email, phone } = req.body;
    console.log(req.body);
    
    const updated = await User.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    ).select("-password"); // never return password

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: err.message });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name email phone");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}