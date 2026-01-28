import mongoose from "moongoose";
import { Schema } from "mongoose";

const brokerschema = new Schema (
    {
        name : {type : String, required : true},
        // role:{type : String, default : "broker"},
        email : {type : String, required : true, unique : true},
        number : {type : String, required : true, unique : true},
        password : {type : String, required : true},
        clients : [],

    },
    {
        timestamps : true
    }
);

export default mongoose.model("broker", brokerschema);