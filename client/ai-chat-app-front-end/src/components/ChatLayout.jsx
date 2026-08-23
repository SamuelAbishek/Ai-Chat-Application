import "./chatUI.css";
import ChatWindow from "./ChatWindow";
import { useNavigate } from "react-router-dom";

const ChatLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("chatMessages");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="chat-layout">
      <header className="app-header">
        <h1>AI Chat</h1>

        <div>
          <button onClick={() => navigate("/change-password")}>
            Change Password
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <ChatWindow />
    </div>
  );
};

export default ChatLayout;