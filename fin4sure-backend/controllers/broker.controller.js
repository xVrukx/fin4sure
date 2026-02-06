import Broker from "../models/broker.model.js";
import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";
/**
 * GET /broker/clients
 * Broker can see all clients referred by him
 */
export const getReferredClients = async (req, res) => {
  try {
    const broker = await Broker.findById(req.user._id);

    if (!broker) {
      return res.status(404).json({ message: "Broker not found" });
    }

    const clients = await Client.find({
      broker_id: broker.brokerId,
    }).select("-password -__v");

    return res.json({
      count: clients.length,
      clients,
    });
  } catch (err) {
    console.error("Get broker clients error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET /broker/leads
 * Broker can see all leads referred through him
 */
export const getBrokerLeads = async (req, res) => {
  try {
    const broker = await Broker.findById(req.user._id);

    if (!broker) {
      return res.status(404).json({ message: "Broker not found" });
    }

    const leads = await Lead.find({
      broker_id: broker.brokerId,
    }).sort({ createdAt: -1 });

    return res.json({
      count: leads.length,
      leads: leads.map((lead) => ({
        id: lead._id,
        name: lead.name,
        email: lead.email,
        number: lead.number,
        product: lead.product,
        status: lead.status, // pending | approved | rejected
        createdAt: lead.createdAt,
      })),
    });
  } catch (err) {
    console.error("Get broker leads error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
