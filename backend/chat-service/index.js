import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Chat Routes
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Chat Service running on port ${PORT}`);
});