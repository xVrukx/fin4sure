import express from "express";
import {
  SendOTP,
  signUpHandler,
  verifyOTP,
  loginHandler,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth routes
router.post("/signup", signUpHandler);     // signup
router.post("/send-otp", SendOTP);         // send OTP
router.post("/verify-otp", verifyOTP);     // verify OTP
router.post("/login", loginHandler);       // login

export default router;