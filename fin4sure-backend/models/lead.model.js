import mongoose from "mongoose";
import { LOAN_PRODUCT_IDS } from "../utils/constants.js";

const leadSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    number: {
      type: String,
      required: true,
      trim: true
    },

    pan_hash: {
      type: String,
      required: true,
    },

    pan_encrypted: {
      type: String,
      required: true
    },

    product: {
      type: String,
      required: true,
      enum: LOAN_PRODUCT_IDS
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    broker_id: {
      type: String,
      default: "self"
    },

    dob: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("lead", leadSchema);
