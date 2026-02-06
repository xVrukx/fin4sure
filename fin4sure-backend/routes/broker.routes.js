import express from "express";
import { getBrokerLeads, getReferredClients } from "../controllers/broker.controller.js";
import { verifyUser, isBroker } from "../middlewares/auth.middleware.js";

const brokerRouter = express.Router();

// broker profile
// router.get("/profile", verifyUser, isBroker, profileHandler); single general auth for all the users
brokerRouter.get("/getRefferedClients", verifyUser,isBroker,getReferredClients);
brokerRouter.get("/getBrokerLeads", verifyUser, getBrokerLeads);
export default brokerRouter;
