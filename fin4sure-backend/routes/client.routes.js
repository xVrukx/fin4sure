import express from "express";
import { profileHandler } from "../controllers/auth.controller.js";
import { verifyUser, isClient } from "../middlewares/auth.middleware.js";

const router = express.Router();

// client profile
router.get("/profile", verifyUser, isClient, profileHandler);

export default router;