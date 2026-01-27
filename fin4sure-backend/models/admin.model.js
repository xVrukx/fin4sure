import mongoose, { mongo, Schema } from "mongoose";

const adminSchema = new Schema(
    {
        name:{type : String, required : true},
        email:{type : String, required : true, unique : true},
        number:{type : String, required : true, unique : true},
        password:{type : String, requied : true}

    },
    {
        timestamps:true
    }
);

export default mongoose.model("admin",adminSchema)