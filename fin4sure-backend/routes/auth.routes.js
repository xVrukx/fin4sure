import express from "express";
import {
  SendOTP,
  signUpHandler,
  verifyOTP,
  loginHandler,
  profileHandler,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js"; // 🔧 CHANGED: needed for protected routes

export const authRouter = express.Router();

// -------------------- Auth routes --------------------
authRouter.post("/signup", signUpHandler);     // signup
authRouter.post("/send-otp", SendOTP);         // send OTP
authRouter.post("/verify-otp", verifyOTP);     // verify OTP
authRouter.post("/login", loginHandler);       // login

// -------------------- Protected routes --------------------
// 🔧 CHANGED: profile must be protected
authRouter.get("/profile", verifyUser, profileHandler);

// -------------------- Logout --------------------
// 🔧 CHANGED: recommended logout implementation
authRouter.post("/logout", verifyUser, (req, res) => {
  res
    .clearCookie("AccessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ message: "Logged out successfully" });
});

export default authRouter;
