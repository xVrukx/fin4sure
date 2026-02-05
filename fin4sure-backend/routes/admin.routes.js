import express from "express";
import {
  userCount,
  brokersByClients,
  clientByproducts,
  brokerStatus,
} from "../controllers/admin.controller.js";
import { verifyUser, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// dashboard stats
router.get("/user-count", verifyUser, isAdmin, userCount);

// brokers list with clients
router.get("/brokers", verifyUser, isAdmin, brokersByClients);

// clients list with products
router.get("/clients", verifyUser, isAdmin, clientByproducts);

// approve / reject broker
router.post("/broker-status", verifyUser, isAdmin, brokerStatus);

export default router;
