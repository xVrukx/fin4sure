import express from "express";
import {
  SendOTP,
  signUpHandler,
  verifyOTP,
  loginHandler,
  profileHandler,
  Logouthandaler,
  sendUpdateNumberOTP,
  verifyUpdateNumberOTP,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js"; // protects routes

const authRouter = express.Router();

// -------------------- Auth routes --------------------
// Public routes
authRouter.post("/signup", signUpHandler);       // Signup
authRouter.post("/send-otp", SendOTP);          // Send OTP for signup
authRouter.post("/verify-otp", verifyOTP);      // Verify OTP for signup/login
authRouter.post("/login", loginHandler);        // Login

// Protected routes (require login)
authRouter.post("/logout", verifyUser, Logouthandaler);            // Logout
authRouter.get("/profile", verifyUser, profileHandler);            // Get profile
authRouter.post("/update-number-otp", verifyUser, sendUpdateNumberOTP); // Send OTP for number update
authRouter.post("/verify-update-number-otp", verifyUser, verifyUpdateNumberOTP); // Verify OTP for number update

export default authRouter;