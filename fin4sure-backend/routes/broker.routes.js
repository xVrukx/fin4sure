import express from "express";
import { profileHandler } from "../controllers/auth.controller.js";
import { verifyUser, isBroker } from "../middlewares/auth.middleware.js";

const router = express.Router();

// broker profile
router.get("/profile", verifyUser, isBroker, profileHandler);

export default router;
