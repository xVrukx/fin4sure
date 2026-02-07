import express from "express";
import {
  userCount,
  brokersWithStats,
  allLeads,
  updateBrokerStatus,
  updateLeadStatus,
  createAdmin
} from "../controllers/admin.controller.js";

import { verifyUser, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", verifyUser, isAdmin, userCount);

router.get("/brokers", verifyUser, isAdmin, brokersWithStats);

router.get("/leads", verifyUser, isAdmin, allLeads);

router.post("/broker-status", verifyUser, isAdmin, updateBrokerStatus);

router.post("/lead-status", verifyUser, isAdmin, updateLeadStatus);

// first admin bootstrap
router.post("/create-admin", createAdmin);

export default router;
