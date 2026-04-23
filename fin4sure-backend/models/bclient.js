import mongoose,{Schema} from "mongoose"

const  Bclient = new Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    number: {type: Number, required: true, unique: true},
    pan_hash: {type: String, unique: true, sparse: true},
    pan_encrypted: {type: String, sparse: true},
    broker_id: {type: String, unique: true},
    
    } 
)