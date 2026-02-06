import express from "express";
import {
  SendOTP,
  signUpHandler,
  verifyOTP,
  loginHandler,
  profileHandler,
  Logouthandaler,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js"; // 🔧 CHANGED: needed for protected routes

const authRouter = express.Router();

// -------------------- Auth routes --------------------
authRouter.post("/signup", signUpHandler);     // signup
authRouter.post("/send-otp", SendOTP);         // send OTP
authRouter.post("/verify-otp", verifyOTP);     // verify OTP
authRouter.post("/login", loginHandler);       // login
authRouter.post("/logout", verifyUser, Logouthandaler)     // logout
authRouter.get("/profile", verifyUser, profileHandler);

export default authRouter