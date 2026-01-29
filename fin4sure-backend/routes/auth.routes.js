import express from "express";
import { SendOTP, signUpHandler, verifyOTP } from "../controllers/auth.controller"; 
auth_router = express.Router
();

auth_router.post("sign_up", signUpHandler());
auth_router.get("sendOTP", SendOTP());
auth_router.post("verifyOTP", verifyOTP());