import Client from "../models/client.model.js";
import jwt from "jsonwebtoken";

// ----------------- GETS THE PRODUCT CLINET APPLIED FOR -----------------
export const getClientProducts = async (req, res) => {
  try {
    const _id = req.user._id;
    const client = await Client.findById(_id)
      .select("product");

    if(!client) {
      return res.status(404).json({message : "no product found"})
    }
    return res.json(client.product);

  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const applyProduct = async (req, res) => {
  try {
    const _id = req.user._id;
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ message: "Product required" });
    }

    const client = await Client.findById(_id);

    client.product.push({
      product,
      status: "pending"
    });

    await client.save();

    return res.json({ message: "Product application submitted" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};