import Client from "../models/client.model.js";

// ----------------- GET CLIENT DATA TO SHOW IN PROFILE -----------------
export const clientDashboard = async (req, res) => {
  try {
    const _id = req.user._id;

    const client = await Client.findById(_id)
      .select("-password -__v");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.json({
      name: client.name,
      email: client.email,
      number: client.number,
      broker: client.broker_id,
      totalProducts: client.product.length,
      products: client.product
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


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


/**
 * PATCH /client/pan
 */
export const updatePAN = async (req, res) => {
  try {
    const { pan_card } = req.body;

    if (!pan_card) {
      return res.status(400).json({ message: "PAN required" });
    }

    const client = await Client.findByIdAndUpdate(
      req.user._id,
      { pan_card },
      { new: true }
    ).select("-password -__v");

    return res.json(client);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
