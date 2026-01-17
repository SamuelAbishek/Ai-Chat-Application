const getAIResponse = require("../services/ai.service");
const Chat = require("../models/Chat");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    // save user message
    await Chat.create({
      sender: "user",
      message: message,
    });

    // get AI response
    const aiResponse = await getAIResponse(message);

    // save AI message
    await Chat.create({
      sender: "ai",
      message: aiResponse,
    });

    // send response
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
