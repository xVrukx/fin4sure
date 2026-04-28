import Broker from "../models/broker.model.js";
import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";

// ----------------- GETTING CLIENT DETAILS OF THE BROKER(INDIVIDUAL) -----------------
export const getReferredClients = async (req, res) => {
  try {
    const _id = req.user._id;
    const broker = await Broker.findById(_id);

    if (!broker.brokerId) {
      return res.status(404).json({ message: "Broker not found" }); //added
    }
    const brokerid = broker.brokerId; //added
    const clients = await Client.find({
      broker_id: brokerid,
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

// ----------------- ADD CLIENT(INDIVIDUAL) -----------------
export const addClient = async (req, res) => {
  const {name, email, gender, number, brokerId} = req.body;
  if(!name|| !email|| !gender|| !number|| !brokerId) {
    res.status(400).json({"message" : "error all fields are required"})
  }
  res.json({"add_client": "client added succesfully"})
}

// ----------------- GETTING LEADS DATA OF BROKER(INDIVIDUAL) -----------------
export const getBrokerLeads = async (req, res) => {
  try {
    const _id = req.user._id;

    const broker = await Broker.findById(_id);

    if (!broker.brokerId) {
      return res.status(404).json({ message: "Broker not found" });
    };

    const brokerid = broker.brokerId;
    const leads = await Lead.find({
      broker_id: brokerid,
    }).sort({ createdAt: -1 });

    const Leads = leads.map((lead) => ({ // added
        id: lead._id,
        name: lead.name,
        email: lead.email,
        gender: lead.gender,
        number: lead.number,
        product: lead.product,
        status: lead.status, // pending | approved | rejected
        createdAt: lead.createdAt,
      }
    )
  );
    return res.json({
      count: leads.length,
      leads: Leads
    });
  } catch (err) {
    console.error("Get broker leads error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
