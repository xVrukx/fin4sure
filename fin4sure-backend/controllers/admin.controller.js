import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";
import Broker from "../models/broker.model.js";
import Admin from "../models/admin.model.js";


// ---------------- USER COUNTS ----------------
export const userCount = async (req, res) => {
  try{
  const totalClients = await Client.countDocuments();
  const totalBrokers = await Broker.countDocuments();
  const totalUsers = totalClients + totalBrokers;

  const approvedBrokers = await Broker.countDocuments({status : "approved"});// added
  const approvedClients = await Broker.countDocuments({status : "approved" });//added
  
  const pendingBrokers = await Broker.countDocuments({ status : "pending" });
  const pendingLeads = await Lead.countDocuments({ status : "pending" });

  res.json({
    totalUsers,
    totalClients,
    totalBrokers,
    approvedBrokers,//added
    approvedClients,//added
    pendingBrokers,
    pendingLeads
  });
}catch(e) {
  return res.status(500).json({message : `internal server error occored ${e}`})
};
};


// ---------------- BROKER'S DATA AND COUNT OF THEIR CLIENTS AND LEADS ----------------
export const brokersWithStats = async (req, res) => {
  try{
    const brokers = await Broker.find()
    .select("name brokerId status email number")
    .lean();

  const result = await Promise.all(
    brokers.map(async (broker) => {
      const clientCount = await Client.countDocuments({
        broker_id: broker.brokerId
      });// here we are fetching the client counts from clients model by broker_id

      const leadCount = await Lead.countDocuments({
        broker_id: broker.brokerId
      });// here we are fetching leads count form lead model by broker_id

      return { ...broker, clientCount, leadCount };
    })
  );

  res.json(result);
}catch(e) {
  return res.status(500).json({message : `internal server error occored ${e}`})
};
};


// ---------------- ALL LEADS (WITH FILTERS) ----------------
export const allLeads = async (req, res) => {
  try{
  const { status, broker } = req.query;

  if(!status) {
    res.status(400).json({message : "invalid status provided"})// added
  }
  if(!broker) {
    res.status(400).json({message : "invalid broker_id provided"})// added
  }
  const filter = {};
  if (status) filter.status = status;
  if (broker) filter.broker_id = broker;

  const leads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  res.json(leads);
}catch(e) {
  return res.status(500).json({message : `internal server error occored ${e}`})
};
};


// ---------------- UPDATE BROKER STATUS ----------------
export const updateBrokerStatus = async (req, res) => {
  try{
    const { brokerId, status } = req.body;

  const brokerStatus = ["approved", "rejected"]// added

  if (!brokerStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const broker = await Broker.findOneAndUpdate(
    { brokerId },
    { $set : {status : status}}, //added
    { new: true }
  );

  if (!broker) return res.status(404).json({ message: "Broker not found" });

  res.json(broker);
}catch(e) {
  return res.status(500).json({message : `internal server error occored ${e}`})
};
};


// ---------------- UPDATE LEAD STATUS ----------------
export const updateLeadStatus = async (req, res) => {
  try{
  const { leadId, status } = req.body;

  const leadStatus = ["approved", "rejected"]// added

  if (!leadStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const lead = await Lead.findByIdAndUpdate(
    {leadId}, // added
    { $set : {status : status} }, //added
    { new: true }
  );

  if (!lead) return res.status(404).json({ message: "Lead not found" });

  res.json(lead);
}catch(e) {
  return res.status(500).json({message : `internal server error occored ${e}`})
};
};


// ---------------- CREATE ADMIN (SAFE) ----------------
export const createAdmin = async (req, res) => {
  const { name, email, number, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) return res.status(409).json({ message: "Admin exists" });

  const admin = await Admin.create({
    name,
    email,
    number,
    password
  });

  res.json({ message: "Admin created", id: admin._id });
};
