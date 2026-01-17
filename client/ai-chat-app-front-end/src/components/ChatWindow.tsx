import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ReactMarkdown from "react-markdown";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔽 NEW: reference to bottom of chat
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔽 NEW: auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMessage = async (text: string) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error getting response" },
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

        {loading && <div className="message ai">AI is thinking...</div>}

        {/* 🔽 NEW: scroll anchor */}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatWindow;
