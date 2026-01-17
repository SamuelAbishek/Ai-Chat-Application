  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const connectDB = require("./config/db");

  const chatRoutes = require("./routes/chat.routes");

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/chat", chatRoutes);
  connectDB();

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
