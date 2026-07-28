const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Send message to AI
router.post("/", authMiddleware, chatController.chat);

// Get chat history
router.get("/", authMiddleware, chatController.getChats);

module.exports = router;