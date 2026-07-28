const getAIResponse = require("../services/ai.service");
const Chat = require("../models/Chat");

// Send message to AI
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    // Save user's message
    await Chat.create({
      userId: req.user.id,
      sender: "user",
      message,
    });

    // Get AI response
    const aiResponse = await getAIResponse(message);

    // Save AI's response
    await Chat.create({
      userId: req.user.id,
      sender: "ai",
      message: aiResponse,
    });

    // Send AI response back to client
    res.status(200).json({
      reply: aiResponse,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get chat history of the logged-in user
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.user.id,
    }).sort({ createdAt: 1 });

    res.status(200).json(chats);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};