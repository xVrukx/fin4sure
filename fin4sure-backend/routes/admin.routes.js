import express from "express";
import {
  userCount,
  brokersWithFullData,
  allLeads,
  updateBrokerStatus,
  updateLeadStatus,
  createAdmin,
} from "../controllers/admin.controller.js";

import { verifyUser, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* ---------- DASHBOARD STATS ---------- */
router.get("/stats", verifyUser, isAdmin, userCount);

/* ---------- BROKERS (FULL DATA) ---------- */
router.get("/brokers", verifyUser, isAdmin, brokersWithFullData);

/* ---------- LEADS (FULL DATA) ---------- */
router.get("/leads", verifyUser, isAdmin, allLeads);

/* ---------- ACTIONS ---------- */
router.post("/broker-status", verifyUser, isAdmin, updateBrokerStatus);
router.post("/lead-status", verifyUser, isAdmin, updateLeadStatus);

/* ---------- ADMIN BOOTSTRAP ---------- */
router.post("/create-admin", createAdmin);

export default router;
