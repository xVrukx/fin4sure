import mongoose, { Schema } from "mongoose";

const bankSchema = new Schema (
    {
        name : {type : String, required : true, unique : true},
        intrest_rate : {type : Boolean, required : true, unique : true},
        loan : {type : String, default: "loan", required: true}
    },
    {
        timestamps: true
    }
)

export default mongoose.model("bank", bankSchema)

