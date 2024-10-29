import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); // this is allow us to excess the body element like username or password or others too  from req.body()
const PORT = process.env.PORT || 7000;

app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Welcome!!!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);


app.listen(7000, () => {
  connectToMongoDb();
  console.log("started on the 7000");
});
