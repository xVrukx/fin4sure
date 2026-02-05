// -------------------------- imports --------------------------
import Client from "../models/client.model.js";
import Broker from "../models/broker.model.js";
// ------------------------------------------------------------


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

    // 🔧 CHANGED: correct findOneAndUpdate usage
    const updatedBroker = await Broker.findOneAndUpdate(
      { brokerId },              // filter
      { $set: { status } },      // update
      { new: true }              // options
    ).select("brokerId status");

    if (!updatedBroker) {
      return res.status(404).json({
        message: "Broker not found",
      });
    }

    return res.json(updatedBroker);
  } catch (e) {
    console.error(e); // 🔧 CHANGED
    return res.status(500).json({
      message: "Internal server error while updating broker status",
    });
  }
};
// ------------------------------------------------------------


// export const brokerStatus = async(req, res) => {
//     try{
//     const {brokerId, status} = req.body;
//     if(!brokerId || !status) {
//         console.log({message : "brokerId or status not provided"});
//         return res.status(500).json("internal server error");
//     }
//     const update = {
//         $set : {
//             status : status
//         }
//     };
//     const callback = {
//         new : true
//     };
//     const brokerStatus = await Broker.findOneAndUpdate({brokerId, update, callback}).select(
//         "status"
//     );
//     if(!brokerStatus) {
//         return res.json({message : "faild to fetch updated user status"})
//     }
//     return res.json(brokerStatus);
// }catch(e) {
//     return res.status(500).json({message:`${e} internal server error occored while changing the Broker's status`})
// };
// };