import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/email.service.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update-Password
export const updatePassword = async(req,res)=>{
    try{
        const {currentPassword,newPassword} = req.body;

        const user = await User.findById(req.user.id);

        const isMatch=await bcrypt.compare(currentPassword,user.password);


        if(!isMatch){
          return res.status(400).json(
            {message:"current password is incorrect"});
        }

        user.password=newPassword;

        await user.save();

        res.status(200).json(
          {message:"Password updated successful"});
    }
    catch(error){
      console.log(error);

      res.status(400).json(
        {message:"Internal server issue"});
    }
};

// Get logged-in user
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Authorized",
      user,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Forgot password: send a one-time reset link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Same response even when the email does not exist.
    // This avoids revealing which addresses have accounts.
    const successMessage =
      "If an account exists with that email, a reset link has been sent.";

    if (!user) {
      return res.status(200).json({ message: successMessage });
    }

    // Send plain token by email; store only its hash in MongoDB.
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    try {
      await sendPasswordResetEmail(user.email, resetUrl);
    } catch (emailError) {
      // Do not leave an unusable token in the database if email fails.
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error("Password-reset email error:", emailError);
      return res.status(500).json({
        message: "Unable to send the reset email. Please try again.",
      });
    }

    return res.status(200).json({ message: successMessage });
  } catch (error) {
    console.error("Forgot-password error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

// Reset password using the one-time token from the email
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Reset token and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user) {
      return res.status(400).json({
        message: "This reset link is invalid or has expired.",
      });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Existing pre-save hook hashes the new password.
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset-password error:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};