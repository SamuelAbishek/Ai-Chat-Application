import "./chatUI.css";
import ChatWindow from "./ChatWindow";

const ChatLayout = () => {
  return (
    <div className="chat-layout">
      <header className="app-header">
        <h1>AI Chat</h1>
      </header>
      <ChatWindow />
    </div>
  );
};

export default ChatLayout;
