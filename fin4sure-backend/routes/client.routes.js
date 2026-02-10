import express from "express";
import {
  clientDashboard,
  updatePAN,
  updateClientProfile,
  applyProduct,
  getClientProducts,
} from "../controllers/client.controller.js";
import { applyLoan, getMyLeads } from "../controllers/lead.controller.js";
import { verifyUser, isClient } from "../middlewares/auth.middleware.js";

const router = express.Router();

// -------------------- Client routes --------------------
// Dashboard
router.get("/dashboard", verifyUser, isClient, clientDashboard);

// Update PAN
router.patch("/pan", verifyUser, isClient, updatePAN);

// Update profile (name, email, number with OTP token if needed)
router.patch("/profile", verifyUser, isClient, updateClientProfile);

// Products applied
router.get("/products", verifyUser, isClient, getClientProducts);
router.post("/apply-product", verifyUser, isClient, applyProduct);

// Loan routes
router.post("/apply-loan", verifyUser, isClient, applyLoan);
router.get("/my-leads", verifyUser, isClient, getMyLeads);

export default router;
