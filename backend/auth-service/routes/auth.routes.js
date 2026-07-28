const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Protected route
router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;