import mongoose, { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt"

const adminSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        // role:{type : String, default : "admin"},
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        number: { type: String, required: true, unique: true, trim: true },
       password:{ type: String, required: true }

    },
    {
        timestamps:true
    }
);

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("admin",adminSchema)