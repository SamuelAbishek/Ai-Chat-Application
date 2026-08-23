import axios from "axios";

const getAIResponse = async (message, history = []) => {
  try {
    // If history is available, use it. Otherwise, send only the current message.
    const messages =
      history && history.length > 0
        ? history
        : [
            {
              role: "user",
              content: message,
            },
          ];

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error.response?.data || error.message);
    return "Sorry, I couldn't generate a response right now.";
  }
};

export default getAIResponse;