import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        role : {type : String, default : "client"},
        email : {type : String, required : true, unique : true},
        number : {type : String, required : true, unique : true},
        pan_card : {type : String, default : "Not provided"},
        product : {type : String, default : "not provided"},
        broker_id : {type : String, default : "self"}
    },
    {
        timestamps : true
    }
);

export default mongoose.model("lead", leadSchema)