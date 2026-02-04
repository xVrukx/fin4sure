import { signAccesstoken, verifyToken } from "../utils/jwt.utlis";
import Client from "../models/client.model";
import Broker from "../models/broker.model";
import Admin from "../models/admin.model";

export const vetifyUser = async(req, res ,next) => {
    const AccessToken = await req.cookie;
    if(!AccessToken) {
        return res.json({message : "tooken is invalid"}) 
    }
    const _id = AccessToken._id;
    const admin = await Admin.findById({_id:_id});
    const client = await Client.findById({_id:_id});
    const broker = await Broker.findById({_id:_id});
    if(!admin || !client || !broker) {
        return res.json({message : "invalid credentials"})
    }
    next()
}