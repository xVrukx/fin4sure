import mongoose from "mongoose";
import bcrypt from "bcrypt"

const brokerschema = new mongoose.Schema(
  {
    brokerId: {
      type: String,
      required: true,
      unique: true, // e.g. "BRK12345"
    },

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    number: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    clients: [
      {
        type: String, // store client _id as string
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

brokerschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

brokerschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export default mongoose.model("broker", brokerschema);