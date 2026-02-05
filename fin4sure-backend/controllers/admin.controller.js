// -------------------------- imports --------------------------
import Client from "../models/client.model.js";
import Broker from "../models/broker.model.js";
// ----------------------------------------------------


// -------------------------- function for fetching User counts --------------------------
export const userCount = async(req, res) => {
    try{
        const totalbrokers = await Broker.countDocuments();
        const totalclients = await Client.countDocuments();
        const totaluser = totalclients + totalbrokers;
        res.json({totaluser, totalbrokers, totalclients});
}catch(e) {
    return res.json({message : `${e} error occored while getting total user, broker and client count`});
};
};
// ----------------------------------------------------


// -------------------------- function for fetching Brokers information --------------------------
export const brokersByClients = async(req, res) => {
    try{
        const brokerInformation = await Broker.find().select(
            "name brokerId status clients"
        ).lean();
        if(!brokerInformation) {
            return res.json({message : "0 Brokers found"});
        };
        return res.json(brokerInformation);
}catch(e) {
    return res.json({message : `${e} error occored while getting Broker information`});
};
};
// ----------------------------------------------------


// -------------------------- function for fetching Clients information --------------------------
export const clientByproducts = async(req, res) => {
    try{
        const clientInformation = await Client.find().select(
            "name number product brokerId"
        ).lean();
        if(!clientInformation) {
            return res.json({message : "0 Client found"})
        }
        res.json(clientInformation);
}catch(e) {
    return res.json({message : `${e} error occored while getting Client information`});
};
};
// ----------------------------------------------------

export const brokerStatus = async(req, res) => {
    try{
    const {brokerId, status} = req.body;
    if(!brokerId || !status) {
        console.log({message : "brokerId or status not provided"});
        return res.status(500).json("internal server error");
    }
    const update = {
        $set : {
            status : status
        }
    };
    const callback = {
        new : true
    };
    const brokerStatus = await Broker.findOneAndUpdate({brokerId, update, callback}).select(
        "status"
    );
    if(!brokerStatus) {
        return res.json({message : "faild to fetch updated user status"})
    }
    return res.json(brokerStatus);
}catch(e) {
    return res.status(500).json({message:`${e} internal server error occored while changing the Broker's status`})
};
};

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