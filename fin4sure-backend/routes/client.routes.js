import express from "express";
import { clientDashboard, updatePAN } from "../controllers/client.controller.js";
import { applyLoan, getMyLeads } from "../controllers/lead.controller.js";

import { verifyUser, isClient } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyUser, isClient, clientDashboard);
router.patch("/pan", verifyUser, isClient, updatePAN);
router.post("/apply-loan", verifyUser, isClient, applyLoan);
router.get("/my-leads", verifyUser, isClient, getMyLeads);

export default router;
