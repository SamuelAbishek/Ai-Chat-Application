require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const chatRoutes = require("./routes/chat.routes");

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