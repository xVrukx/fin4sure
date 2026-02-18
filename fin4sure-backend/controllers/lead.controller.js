import Lead from "../models/lead.model.js";
import Client from "../models/client.model.js";
import { encryptPAN, hashPAN } from "../utils/pan.crypto.js";
import { LOAN_PRODUCT_IDS } from "../utils/constants.js";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const applyLoan = async (req, res) => {

    const userId = req.user._id;
    const { pan, product } = req.body;
    console.log({message: "got body"})

    // ---------- validate input ----------
    if (!pan || !product) {
      return res.status(400).json({
        message: "PAN and product are required"
      });
    }
    console.log({message: "got pan snd product"})
    if (!LOAN_PRODUCT_IDS.includes(product)) {
      return res.status(400).json({
        message: "Invalid loan product"
      });
    }
    console.log({message: "product is valid"})
    const cleanPAN = pan.trim().toUpperCase();
    console.log({message: "cleaned pan"})
    if (!PAN_REGEX.test(cleanPAN)) {
      return res.status(400).json({
        message: "Invalid PAN format"
      });
    }
    console.log({message: "verified pan"})
    // ---------- fetch client snapshot ----------
    const client = await Client.findById(userId)
      .select("name email number broker_id");
    console.log({message: "fetching user id to put product"})
    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }
    console.log({message: "hashing pan"})
    // ---------- duplicate PAN check ----------
    const panHash = hashPAN(cleanPAN);

    const exists = await Lead.findOne({ pan_hash: panHash });
    console.log({message: "checking if pan exist"})
    if (exists) {
      return res.status(409).json({
        message: "Application already exists for this PAN"
      });
    }

    // ---------- encrypt PAN ----------
    const encryptedPAN = encryptPAN(cleanPAN);
    console.log({message: "encrypting pan"})
    // ---------- create lead ----------
    const lead = await Lead.create({// added
      client_id: _id,
      name: client.name,
      email: client.email,
      number: client.number,
      broker_id: client.broker_id || "self",
      product,
      pan_hash: panHash,
      pan_encrypted: encryptedPAN
    });

    const Client_update = await Client.findByIdAndUpdate(
      {
        client_id: _id
      },{
        $set : {
      pan_hash: panHash,
      pan_encrypted: encryptedPAN
    }
  },{
    new : true
  }
);

    console.log({message: "creating leaad"})
    console.log({message : Client_update})
    return res.status(201).json({
      message: "Loan application submitted successfully",
      leadId: lead._id,
      status: lead.status
    });

};

export const getMyLeads = async (req, res) => { // should be in client cause it provides client data to the client dashboard
  try {
    const _id = req.user._id;
    const client = await Client.findById(_id)
      .select("email number");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const leads = await Lead.find({_id : _id})
      .sort({ createdAt: -1 })
      .select("product status createdAt");

    res.json(leads);

  } catch (err) {
    console.error("Get my leads error:", err);
    res.status(500).json({ message: "Server error" });
  }
};