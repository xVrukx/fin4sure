import Client from "../models/client.model";
import Broker from "../models/broker.model";

export const userCount = async(req, res) => {
    try{
        const brokerArray = await Broker.find();
        const clientArray = await Client.find();
        const totalbrokers = brokerArray.length;
        const totalclients = clientArray.length;
        const totaluser = totalclients + totalbrokers;
        res.json(totaluser, totalbrokers, totalclients);
}catch(e) {
    return res.json({message : `${e} error occored while getting total broker count`});
};
};

export const brokersByClients = async(req, res) => {
    try{
        const BrokerArray = await Broker.find();
        let brokerIds = [];
        for (const broker of BrokerArray) {
            brokerIds.push({"Broker" : broker.brokerId, "clients" : broker.clients});
        };
        return res.json(brokerIds);
}catch(e) {
    return res.json({message : `${e} error occored while getting total broker count`});
};
};

export const usersByproducts = async(req, res) => {
    try{
        let clientProducts = [];
        const clientArray = await Client.find();
        for(const client of clientArray) {
            clientProducts.push({"client":client._id,"products":client.product});
        };
        res.json(clientProducts);
}catch(e) {
    return res.json({message : `${e} error occored while getting total broker count`});
};
};



// -------------------------------------------------------------------------------------

// export const userCount = async (req, res) => {
//   try {
//     const [totalBrokers, totalClients] = await Promise.all([
//       Broker.countDocuments(),
//       Client.countDocuments(),
//     ]);

//     return res.json({
//       totalUsers: totalBrokers + totalClients,
//       totalBrokers,
//       totalClients,
//     });
//   } catch (err) {
//     console.error("User count error:", err);
//     return res.status(500).json({
//       message: "Failed to fetch user counts",
//     });
//   }
// };

// export const brokersByClients = async (req, res) => {
//   try {
//     const brokers = await Broker.find()
//       .select("brokerId name clients")
//       .lean();

//     const result = brokers.map((broker) => ({
//       brokerId: broker.brokerId,
//       name: broker.name,
//       totalClients: broker.clients.length,
//       clients: broker.clients, // or remove if not needed
//     }));

//     return res.json(result);
//   } catch (err) {
//     console.error("Broker client mapping error:", err);
//     return res.status(500).json({
//       message: "Failed to fetch broker client mapping",
//     });
//   }
// };


// export const usersByProducts = async (req, res) => {
//   try {
//     const clients = await Client.find()
//       .select("name email product")
//       .lean();

//     const result = clients.map((client) => ({
//       clientId: client._id,
//       name: client.name,
//       email: client.email,
//       products: client.product,
//     }));

//     return res.json(result);
//   } catch (err) {
//     console.error("Users by product error:", err);
//     return res.status(500).json({
//       message: "Failed to fetch users by products",
//     });
//   }
// };
