import express from "express";
import {
  clientDashboard,
  getClientProducts,
  applyProduct,
  updatePAN
} from "../controllers/client.controller.js";

import { verifyUser, isClient } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", verifyUser, isClient, clientDashboard);
router.get("/products", verifyUser, isClient, getClientProducts);

router.post("/apply-product", verifyUser, isClient, applyProduct);
router.patch("/pan", verifyUser, isClient, updatePAN);

export default router;