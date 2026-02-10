import express from "express";
import {
  applyProduct,
  getClientProducts,
} from "../controllers/client.controller.js";
import { applyLoan, getMyLeads } from "../controllers/lead.controller.js";
import { verifyUser, isClient } from "../middlewares/auth.middleware.js";

const router = express.Router();

// -------------------- Client routes --------------------

// Products applied
router.get("/products", verifyUser, isClient, getClientProducts);
router.post("/apply-product", verifyUser, isClient, applyProduct);

// Loan routes
router.post("/apply-loan", verifyUser, isClient, applyLoan);
router.get("/my-leads", verifyUser, isClient, getMyLeads);

export default router;
