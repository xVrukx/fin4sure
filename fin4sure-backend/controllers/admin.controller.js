import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";
import Broker from "../models/broker.model.js";
import Admin from "../models/admin.model.js";
import ExcelJS from "exceljs";

/* -----------------------------------------------------
   ADMIN STATS
----------------------------------------------------- */
export const userCount = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalBrokers = await Broker.countDocuments();

    const approvedBrokers = await Broker.countDocuments({ status: "approved" });
    const pendingBrokers = await Broker.countDocuments({ status: "pending" });
    const pendingLeads = await Lead.countDocuments({ status: "pending" });

    res.json({
      totalUsers: totalClients + totalBrokers,
      totalClients,
      totalBrokers,
      approvedBrokers,
      pendingBrokers,
      pendingLeads
    });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

/* -----------------------------------------------------
   ADMIN – BROKERS WITH FULL INFO
----------------------------------------------------- */
export const brokersWithFullData = async (req, res) => {
  try {
    const brokers = await Broker.find()
      .select("-password -__v")
      .lean();

    const result = await Promise.all(
      brokers.map(async (broker) => {
        const clients = await Client.find({
          broker_id: broker.brokerId
        }).select("-password -__v");

        const leads = await Lead.find({
          broker_id: broker.brokerId
        }).select("-pan_encrypted -__v");

        return {
          ...broker,
          clientCount: clients.length,
          leadCount: leads.length,
          clients,
          leads
        };
      })
    );

    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Failed to load brokers" });
  }
};

/* -----------------------------------------------------
   ADMIN – ALL LEADS WITH FULL INFO
----------------------------------------------------- */
export const allLeads = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    const enrichedLeads = await Promise.all(
      leads.map(async (lead) => {
        let broker = null;

        if (lead.broker_id !== "self") {
          broker = await Broker.findOne(
            { brokerId: lead.broker_id },
            "name brokerId email number"
          );
        }

        return {
          ...lead,
          source: lead.broker_id === "self" ? "direct" : "broker",
          broker
        };
      })
    );

    res.json(enrichedLeads);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

/* -----------------------------------------------------
   ADMIN – UPDATE BROKER STATUS
----------------------------------------------------- */
export const updateBrokerStatus = async (req, res) => {
  try {
    const { brokerId, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const broker = await Broker.findOneAndUpdate(
      { brokerId },
      { status,
        statusUpdatedAt: new Date()
       },
      { new: true }
    ).select("-password -__v");

    if (!broker) {
      return res.status(404).json({ message: "Broker not found" });
    }

    res.json(broker);
  } catch (e) {
    res.status(500).json({ message: "Failed to update broker status" });
  }
};

/* -----------------------------------------------------
   ADMIN – UPDATE LEAD STATUS
----------------------------------------------------- */
export const updateLeadStatus = async (req, res) => {
  try {
    const { leadId, status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const lead = await Lead.findByIdAndUpdate(
      leadId,
      { status,
        statusUpdatedAt: new Date()
       },
      { new: true }
    );
 
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (e) {
    res.status(500).json({ message: "Failed to update lead status" });
  }
};



/* -----------------------------------------------------
   ADMIN – CREATE ADMIN (BOOTSTRAP)
----------------------------------------------------- */
export const createAdmin = async (req, res) => {
  const { name, email, number, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Admin already exists" });
  }

  const admin = await Admin.create({
    name,
    email,
    number,
    password
  });

  res.json({
    message: "Admin created successfully",
    id: admin._id
  });
};

/* -----------------------------------------------------
   ADMIN – Export Data
----------------------------------------------------- */

export const exportData = async (req, res) => {
  try {

    const { from, to, type } = req.query;

    const start = new Date(from);
    const end = new Date(to);

    let data = [];

    if (type === "brokers") {
      data = await Broker.find({
        createdAt: { $gte: start, $lte: end }
      }).lean();
    }

    if (type === "clients") {
      data = await Lead.find({
        createdAt: { $gte: start, $lte: end }
      }).lean();
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "number", width: 20 },
      { header: "Status", key: "status", width: 15 },
      { header: "Created", key: "createdAt", width: 20 }
    ];

    data.forEach((item) => {

      const row = sheet.addRow({
        name: item.name,
        email: item.email,
        number: item.number,
        status: item.status,
        createdAt: item.createdAt
      });

      if (item.statusUpdatedAt !== item.createdAt) {

          if (item.status === "approved") {
            row.getCell("status").fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "C6EFCE" }
            };
          }

          if (item.status === "rejected") {
            row.getCell("status").fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFC7CE" }
            };
          }
      }
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    res.status(500).json({ message: "Export failed" });
  }
};