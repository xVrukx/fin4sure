import Lead from "../models/lead.model.js";
import Client from "../models/client.model.js";
import { encryptPAN, hashPAN } from "../utils/pan.crypto.js";
import { LOAN_PRODUCT_IDS } from "../utils/constants.js";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const applyLoan = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pan, product } = req.body;

    // ---------- validate input ----------
    if (!pan || !product) {
      return res.status(400).json({
        message: "PAN and product are required"
      });
    }

    if (!LOAN_PRODUCT_IDS.includes(product)) {
      return res.status(400).json({
        message: "Invalid loan product"
      });
    }

    const cleanPAN = pan.trim().toUpperCase();

    if (!PAN_REGEX.test(cleanPAN)) {
      return res.status(400).json({
        message: "Invalid PAN format"
      });
    }

    // ---------- fetch client snapshot ----------
    const client = await Client.findById(userId)
      .select("name email number broker_id");

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    // ---------- duplicate PAN check ----------
    const panHash = hashPAN(cleanPAN);

    const exists = await Lead.findOne({ pan_hash: panHash });

    if (exists) {
      return res.status(409).json({
        message: "Application already exists for this PAN"
      });
    }

    // ---------- encrypt PAN ----------
    const encryptedPAN = encryptPAN(cleanPAN);

    // ---------- create lead ----------
    const lead = await Lead.create({
      name: client.name,
      email: client.email,
      number: client.number,
      broker_id: client.broker_id || "self",
      product,
      pan_hash: panHash,
      pan_encrypted: encryptedPAN
    });

    return res.status(201).json({
      message: "Loan application submitted successfully",
      leadId: lead._id,
      status: lead.status
    });

  } catch (err) {
    console.error("Apply loan error:", err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const getMyLeads = async (req, res) => {
  try {
    const client = await Client.findById(req.user._id)
      .select("email number");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const leads = await Lead.find({
      email: client.email,
      number: client.number
    })
      .sort({ createdAt: -1 })
      .select("product status createdAt");

    res.json(leads);

  } catch (err) {
    console.error("Get my leads error:", err);
    res.status(500).json({ message: "Server error" });
  }
};