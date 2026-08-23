import express from "express";

import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


/*
	The Express Router takes care of matching the remaining path after the mount path has already been matched.
	It's not that "all the rest of the URL before /register is handled by authRoutes."
	/api/auth is the mount path, and once that matches,
	Express passes the remaining path (/register) to the mounted router for route matching.
*/

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

//update password
router.post("/update-password",authMiddleware, authController.updatePassword);

// Protected route
router.get("/me", authMiddleware, authController.getProfile);
// If a GET request matches /me, first execute authMiddleware.  
// If the middleware successfully completes its authentication work and calls next(), then execute authController.getProfile.

export default router;