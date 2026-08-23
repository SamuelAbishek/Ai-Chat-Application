import "dotenv/config";

import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// AUTH ROUTES
// =======================

// Register
app.post("/api/auth/register", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE_URL}/api/auth/register`,
            req.body
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Internal Server Error" }
        );
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.AUTH_SERVICE_URL}/api/auth/login`,
            req.body
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Internal Server Error" }
        );
    }
});

// Get Profile
app.get("/api/auth/me", async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.AUTH_SERVICE_URL}/api/auth/me`,
            {
                headers: {
                    Authorization: req.headers.authorization,
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Internal Server Error" }
        );
    }
});

//update-password
app.post("/api/auth/update-password", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/update-password`,
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    res.status(response.status).json(response.data);

  } catch (error) {
    res.status(error.response?.status || 500).json(
      error.response?.data || {
        message: "Internal Server Error",
      }
    );
  }
});
// =======================
// CHAT ROUTES
// =======================

// Send Chat
app.post("/api/chat", async (req, res) => {
    try {
        const response = await axios.post(
            `${process.env.CHAT_SERVICE_URL}/api/chat`,
            req.body,
            {
                headers: {
                    Authorization: req.headers.authorization,
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Internal Server Error" }
        );
    }
});

// Chat History
app.get("/api/chat", async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.CHAT_SERVICE_URL}/api/chat`,
            {
                headers: {
                    Authorization: req.headers.authorization,
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Internal Server Error" }
        );
    }
});

// =======================

app.get("/", (req, res) => {
    res.json({
        message: "API Gateway is running...",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});