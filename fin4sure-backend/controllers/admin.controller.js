import Client from "../models/client.model";
import Broker from "../models/broker.model";

export const totalBrokers = async(req, res) => {
    const brokerArray = await Broker.find();
    const totalbtoker = brokerArray.length;
}
