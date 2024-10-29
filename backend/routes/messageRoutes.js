import express from "express";

import { sendMessage, getMessages } from "../controllers/messageController.js";
import protectedRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
