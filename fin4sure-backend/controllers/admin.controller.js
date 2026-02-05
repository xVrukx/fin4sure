// -------------------------- imports --------------------------
import Client from "../models/client.model";
import Broker from "../models/broker.model";
// ----------------------------------------------------


// -------------------------- function for fetching User counts --------------------------
export const userCount = async(req, res) => {
    try{
        let totalbrokers = await Broker.countDocuments();
        let totalclients = await Client.countDocuments();
        
        if(!totalbrokers) {
            totalbrokers = 0
            console.log({message : "faield to fetch broker count"})
        }
        if(!totalclients) {
            totalclients = 0
            console.log({message : "faield to fetch total client"})
        }
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
        
        let brokerInformation = [];
        const BrokerArray = await Broker.find().select(
            "name broker_id clients"
        ).lean();

        if(!BrokerArray){
            return res.json({message : "faield to fetch broker information"});
        };
        for (const broker of BrokerArray) {
            brokerInformation.push(broker);
        };
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
        let clientInformation = [];
        const clientArray = await Client.find().select(
            "name number product broker_id"
        ).lean();
        if(!clientArray) {
            return res.json({message : "faield to fetch client information"})
        }
        for(const client of clientArray) {
            clientInformation.push(client);
        };
        if(!clientInformation) {
            return res.json({message : "0 Client found"})
        }
        res.json(clientInformation);
}catch(e) {
    return res.json({message : `${e} error occored while getting Client information`});
};
};
// ----------------------------------------------------