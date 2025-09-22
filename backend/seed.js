import mongoose from "mongoose";
import dotenv from "dotenv";
import Message from "./models/Message.js"; // adjust path if needed

dotenv.config(); // load MONGO_URI from .env

const clearMessages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Message.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} messages`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error clearing messages:", err);
    process.exit(1);
  }
};

clearMessages();
