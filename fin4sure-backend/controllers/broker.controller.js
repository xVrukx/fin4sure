import Client from "../models/client.model.js";
import Leads from "../models/lead.model.js";

export const client_insite = async(req, res) => {
    const total_client = await Client.find(); 
}

//remaining