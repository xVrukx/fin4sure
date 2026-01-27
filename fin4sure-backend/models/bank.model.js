import mongoose, { Schema } from "mongoose";

const bankSchema = new Schema (
    {
        name: {type : String, required : true},
    },
    {
        timestamps: true
    }
)

export default mongoose.model("bank", bankSchema)

