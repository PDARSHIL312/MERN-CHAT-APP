import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Buffer } from "buffer";
import connectToMongoDb from "./db/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

if (typeof global !== "undefined" && !global.Buffer) {
  global.Buffer = Buffer;
}

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server started on port ${PORT}`);
});
