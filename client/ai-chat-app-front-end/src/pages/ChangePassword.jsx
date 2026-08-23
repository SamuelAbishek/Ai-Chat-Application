  import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/authService";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const data = await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );

      setMessage(data.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
      });

    } catch (err) {
      setError(err.message || "Failed to update password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Change Password</h1>

        {error && <div className="auth-error">{error}</div>}

        {message && <div>{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Change Password
          </button>

        </form>

        <button onClick={() => navigate("/chat")}>
          Back to Chat
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;