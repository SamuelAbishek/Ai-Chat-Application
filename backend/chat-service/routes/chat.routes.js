import express from "express";

import * as chatController from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Send message to AI
router.post("/", authMiddleware, chatController.chat);

// Get chat history
router.get("/", authMiddleware, chatController.getChats);

export default router;