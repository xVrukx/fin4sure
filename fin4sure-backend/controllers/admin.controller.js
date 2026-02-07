import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";
import Broker from "../models/broker.model.js";
import Admin from "../models/admin.model.js";


// ---------------- USER COUNTS ----------------
export const userCount = async (req, res) => {
  const totalClients = await Client.countDocuments();
  const totalBrokers = await Broker.countDocuments();
  const totalUsers = totalClients + totalBrokers;

  const pendingBrokers = await Broker.countDocuments({ status: "pending" });
  const pendingLeads = await Lead.countDocuments({ status: "pending" });

  res.json({
    totalUsers,
    totalClients,
    totalBrokers,
    pendingBrokers,
    pendingLeads
  });
};


// ---------------- BROKER LIST + CLIENT COUNT ----------------
export const brokersWithStats = async (req, res) => {
  const brokers = await Broker.find()
    .select("name brokerId status email number")
    .lean();

  const result = await Promise.all(
    brokers.map(async (b) => {
      const clientCount = await Client.countDocuments({
        broker_id: b.brokerId
      });

      const leadCount = await Lead.countDocuments({
        broker_id: b.brokerId
      });

      return { ...b, clientCount, leadCount };
    })
  );

  res.json(result);
};


// ---------------- ALL LEADS (WITH FILTERS) ----------------
export const allLeads = async (req, res) => {
  const { status, broker } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (broker) filter.broker_id = broker;

  const leads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  res.json(leads);
};


// ---------------- UPDATE BROKER STATUS ----------------
export const updateBrokerStatus = async (req, res) => {
  const { brokerId, status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const broker = await Broker.findOneAndUpdate(
    { brokerId },
    { status },
    { new: true }
  );

  if (!broker) return res.status(404).json({ message: "Broker not found" });

  res.json(broker);
};


// ---------------- UPDATE LEAD STATUS ----------------
export const updateLeadStatus = async (req, res) => {
  const { leadId, status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const lead = await Lead.findByIdAndUpdate(
    leadId,
    { status },
    { new: true }
  );

  if (!lead) return res.status(404).json({ message: "Lead not found" });

  res.json(lead);
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
