import mongoose from "mongoose";
import bcrypt from "bcrypt"

const clientSchema = new mongoose.Schema(
  {
    client_id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    gender: {type: String, required: true},
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
    ref_id: {type: String, sparse : true},
    broker_id: {type: String, default: "self"}, // "self" or something like "BRK12345"
    dob : {
    type : String, sparse : true
  }, address : {
    type : String, sparse : true
  }, state : {
    type : String, sparse : true
  }, district : {
    type : String, sparse : true
  }, pincode : {
    type : String, sparse : true
  }

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
