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