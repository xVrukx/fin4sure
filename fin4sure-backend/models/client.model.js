import mongoose from "mongoose";
import bcrypt from "bcrypt"

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    number: { type: String, required: true, unique: true, trim: true },
    pan_hash: {type: String,unique: true,sparse: true},
    pan_encrypted: {type: String,sparse: true},
    product: [
      {product : {
        type: String, sparse : true
      },
      status : {
        type : String, required : true, enum : ["approved", "pending", "rejected"], default : "pending"
      }
      }
    ],
    password: { type: String, required: true },
    broker_id: {type: String,default: "self"}, // "self" or something like "BRK12345"
    dob: {type: String, required: true},
    address: {type: String, required: true}
  },
  { timestamps: true }
);

clientSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


clientSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)  // here we made this function using methods method
}

export default mongoose.model("client", clientSchema);
