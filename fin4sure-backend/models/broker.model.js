import mongoose from "mongoose";
import bcrypt from "bcrypt"

const brokerschema = new mongoose.Schema(
  {
    brokerId: { type: String, required : true, unique : true},
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    number: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending"},
    clients: [ {type: String, sparse : true, unique : true} ]
  },
  { timestamps: true }
);

brokerschema.pre("save", async function () {
    if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)};
});


brokerschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("broker", brokerschema);