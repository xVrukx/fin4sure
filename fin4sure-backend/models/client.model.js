import mongoose from "mongoose";
import bcrypt from "bcrypt"

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    number: { type: String, required: true, unique: true, trim: true },
    pan_card: {type: String, unique: true, sparse: true,}, // allows many "Not provided"
    product: { type: String, default: "not provided" },
    password: { type: String, required: true },
    broker_id: {type: String,default: "self"}, // "self" or something like "BRK12345"
  },
  { timestamps: true }
);

clientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

clientSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)  // here we made this function using methods method
}

export default mongoose.model("client", clientSchema);
