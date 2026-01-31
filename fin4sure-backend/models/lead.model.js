import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        email : {type : String, required : true},
        number : {type : String, required : true},
        pan_card : {type : String, sparse : true, unique : true},
        product : [{type : String, sparse : true}],
        broker_id : {type : String, default : "self"}
    },
    {
        timestamps : true
    }
);

export default mongoose.model("lead", leadSchema)