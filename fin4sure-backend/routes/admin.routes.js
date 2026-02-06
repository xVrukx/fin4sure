import express from "express";
import {
  userCount,
  brokersByClients,
  clientByproducts,
  brokerStatus,
} from "../controllers/admin.controller.js";
import { verifyUser, isAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = express.Router();

// dashboard stats
adminRouter.get("/user-count", verifyUser, isAdmin, userCount);

// brokers list with clients
adminRouter.get("/brokers", verifyUser, isAdmin, brokersByClients);

// clients list with products
adminRouter.get("/clients", verifyUser, isAdmin, clientByproducts);

// approve / reject broker
adminRouter.post("/broker-status", verifyUser, isAdmin, brokerStatus);

// approve / reject client product
adminRouter.post("/", verifyUser, isAdmin, clientByproducts)

export default adminRouter;
