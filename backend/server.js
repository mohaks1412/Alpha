// server.js
import express from "express";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"
import { Server } from "socket.io";
import socketHandler from "./socket.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(cookieParser());

const allowedOrigin = ["https://alpha-xi-three.vercel.app", "http://localhost:5173"]; // your frontend origin

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));



app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});


// REST routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigin, // your Vite frontend
    credentials: true,
  },
});

socketHandler(io)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

server.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
