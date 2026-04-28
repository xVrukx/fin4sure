import mongoose,{Schema} from "mongoose"

const  Bclient = new Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    gender: {type: String, required: true},
    number: {type: String, required: true, unique: true},
    broker_id: {type: String, unique: true},
    },
    { timestamps: true }
)
export default mongoose.model("bclient", Bclient);