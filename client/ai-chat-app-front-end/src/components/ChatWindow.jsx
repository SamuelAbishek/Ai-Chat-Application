import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ReactMarkdown from "react-markdown";
import { sendMessage, getChats } from "../services/chatService";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore chat messages from sessionStorage on page load
  useEffect(() => {
  const loadChats = async () => {
    const savedMessages = sessionStorage.getItem("chatMessages");

    // Load from sessionStorage if available
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
      setIsLoaded(true);
      return;
    }

    // Otherwise fetch from MongoDB
    try {
      const chats = await getChats();

      const formattedChats = chats.map((chat) => ({
        sender: chat.sender,
        text: chat.message,
      }));

      setMessages(formattedChats);

      sessionStorage.setItem(
        "chatMessages",
        JSON.stringify(formattedChats)
      );
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  loadChats();
}, []);
  // Save chat messages whenever they change
  useEffect(() => {
    if (!isLoaded) return;

    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages, isLoaded]);

  // Reference to bottom of chat
  const bottomRef = useRef(null);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = async (text) => {
  // Create the updated conversation including the new user message
  const updatedMessages = [
    ...messages,
    { sender: "user", text },
  ];

  // Update UI immediately
  setMessages(updatedMessages);
  setLoading(true);

  try {
    // Convert chat history into Groq/OpenAI format
    const history = updatedMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Send message + history
    const data = await sendMessage(text, history);

    // Add AI response
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: error.message || "Error getting response",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div className="message ai">
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatWindow;