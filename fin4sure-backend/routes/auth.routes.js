import express from "express";
import {
  SendOTP,
  signUpHandler,
  verifyOTP,
  loginHandler,
  profileHandler,
} from "../controllers/auth.controller.js";

export const authRouter = express.Router();

// Auth routes
authRouter.post("/signup", signUpHandler);     // signup
authRouter.post("/send-otp", SendOTP);         // send OTP
authRouter.post("/verify-otp", verifyOTP);     // verify OTP
authRouter.post("/login", loginHandler);       // login
authRouter.get("/profile", profileHandler);    // profile
// authRouter.post("/logout", logout);     //logout