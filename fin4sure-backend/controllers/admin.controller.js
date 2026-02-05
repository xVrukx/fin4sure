// -------------------------- imports --------------------------
import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";;
import Broker from "../models/broker.model.js";
// ----------------------------------------------------


// -------------------------- function for fetching User counts --------------------------
export const userCount = async (req, res) => {
  try {
    const totalbrokers = await Broker.countDocuments();
    const totalclients = await Client.countDocuments();

    const totaluser = totalclients + totalbrokers;

    return res.json({ totaluser, totalbrokers, totalclients });
  } catch (e) {
    console.error(e); // 🔧 CHANGED: proper logging
    return res.status(500).json({
      message: "Error occurred while getting user counts",
    });
  }
};
// ------------------------------------------------------------


// -------------------------- function for fetching Brokers information --------------------------
export const brokersByClients = async (req, res) => {
  try {
    const brokerInformation = await Broker.find()
      .select("name brokerId status clients")
      .lean();

    // 🔧 CHANGED: removed invalid null check (find() always returns array)
    return res.json(brokerInformation);
  } catch (e) {
    console.error(e); // 🔧 CHANGED
    return res.status(500).json({
      message: "Error occurred while getting broker information",
    });
  }
};
// ------------------------------------------------------------


// -------------------------- function for fetching Clients information --------------------------
export const clientByproducts = async (req, res) => {
  try {
    const clientInformation = await Client.find()
      .select("name number product broker_id") // 🔧 CHANGED: fixed field name
      .lean();

    return res.json(clientInformation); // 🔧 CHANGED
  } catch (e) {
    console.error(e); // 🔧 CHANGED
    return res.status(500).json({
      message: "Error occurred while getting client information",
    });
  }
};
// ------------------------------------------------------------


// -------------------------- function for updating Broker status --------------------------
export const brokerStatus = async (req, res) => {
  try {
    const { brokerId, status } = req.body;

    // 🔧 CHANGED: input validation + correct status code
    if (!brokerId || !status) {
      return res.status(400).json({
        message: "brokerId and status are required",
      });
    }

    // 🔧 CHANGED: validate allowed status values
    const allowedStatus = ["pending", "approved", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid broker status",
      });
    }

    const filter = {brokerId};
    const update = { $set: { status } };
    const callback = {new : true};

    // 🔧 CHANGED: correct findOneAndUpdate usage
    const updatedBroker = await Broker.findOneAndUpdate(
      filter,              // filter
      update,      // update
      callback              // options
    ).select("brokerId status");

    if (!updatedBroker) {
      return res.status(404).json({
        message: "Broker not found",
      });
    };

    return res.json(updatedBroker);
  } catch (e) {
    console.error(e); // 🔧 CHANGED
    return res.status(500).json({
      message: "Internal server error while updating broker status",
    });
  };
};
// ------------------------------------------------------------


// -------------------------- function for updating client's product status --------------------------

export const clientStatus = async(req, res) => {
    try{
    const {product, status} = req.body;
    if(!product || !status) {
        console.log({message : "clientId or status not provided"});
        return res.status(400).json("status not provided");
    }

    const allowedStatus = ["approved", "rejected", "pending"]

    if(!allowedStatus.includes(status)){
        return res.status(400).json("invalid status code provided");
    }

    const filter = { product : { product : product }}
    const update = { $set : { product : { status :status }}};
    const callback = {new : true};
    const clientStatus = await Client.findOneAndUpdate(filter, update, callback).select(
        "number product"
    );
    if(!clientStatus) {
      return res.status(404).json({
        message: "client not found",
      });}
    return res.json(clientStatus);
}catch(e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error while updating client's product status",
    });
};
};
// ------------------------------------------------------------