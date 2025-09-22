import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false , sparse: true}, // set to required in profile completion
  password: { type: String }, // populated only for email/password login
  provider: { type: String, enum: ["local","google-oauth2", "google", "facebook", "linkedin"], default: "local" },
  auth0Id: { type: String, unique: true, sparse: true }, 
}, { timestamps: true });

export default mongoose.model("User", userSchema);
