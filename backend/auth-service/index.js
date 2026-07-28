require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

app.use((req, res, next) => {
  console.log("Auth Service received:", req.method, req.originalUrl);
  next();
});

// Auth Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});