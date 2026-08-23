import getAIResponse from "../services/ai.service.js";
import Chat from "../models/Chat.js";

// Send message to AI
export const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    console.log("\n========== CHAT REQUEST ==========");
    console.log("req.user:", req.user);
    console.log("User ID received:", req.user.id);
    console.log("Message:", message);
    console.log("History:", history);

    // Save user message
    const userChat = await Chat.create({
      userId: req.user.id,
      sender: "user",
      message,
    });

    console.log("User chat saved:");
    console.log(userChat);

    // Get AI response with conversation history
    const aiResponse = await getAIResponse(message, history);

    console.log("AI Response:", aiResponse);

    // Save AI response
    const aiChat = await Chat.create({
      userId: req.user.id,
      sender: "ai",
      message: aiResponse,
    });

    console.log("AI chat saved:");
    console.log(aiChat);

    console.log("========== END REQUEST ==========\n");

    res.status(200).json({
      reply: aiResponse,
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get chat history
export const getChats = async (req, res) => {
  try {
    console.log("Fetching chats for user:", req.user.id);

    const chats = await Chat.find({
      userId: req.user.id,
    }).sort({ createdAt: 1 });

    console.log("Chats found:", chats.length);

    res.status(200).json(chats);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};