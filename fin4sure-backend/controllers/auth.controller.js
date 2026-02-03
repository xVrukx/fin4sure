// ----------------------------------------------------------------------------------------------------------------------
// imports

import Admin from "../models/admin.model.js";
import Broker from "../models/broker.model.js";
import Client from "../models/client.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// global variables
const url = "/login";
const otp_data = {}; // CHANGED: store as object instead of raw OTP (future-safe)
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// signup handler
export const signUpHandler = async (req, res) => {
  try {
    const { name, email, number, password, role, broker_id } = req.body;

    // CHANGED: fixed validation typos, logic & ensured response is sent
    if (
      !name?.trim() ||
      !email?.trim() ||
      !number?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      console.log("Signup failed: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim(); // CHANGED: normalize email

    // CHANGED: use findOne instead of find, await properly
    const existingClient = await Client.findOne({
      $or: [{ number }, { email: normalizedEmail }],
    });
    const existingBroker = await Broker.findOne({
      $or: [{ number }, { email: normalizedEmail }],
    });
    const existingAdmin = await Admin.findOne({
      $or: [{ number }, { email: normalizedEmail }],
    });

    if (existingClient || existingBroker || existingAdmin) {
      console.log("Signup blocked: User already exists");
      return res.status(409).json({ message: "User already exists" });
    }

    switch (role) {
      case "client": {
        const newClient = new Client({
          name,
          email: normalizedEmail,
          number,
          password, // hashed by pre-save hook
          broker_id: broker_id || "self",
        });

        await newClient.save();

        // CHANGED: validate broker referral before attaching
        if (broker_id && broker_id !== "self") {
          const broker = await Broker.findOne({ brokerId: broker_id });

          if (!broker) {
            console.log("Invalid broker ID provided during signup");
            return res.status(400).json({ message: "Invalid Broker ID" });
          }

          broker.clients.push(newClient._id.toString());
          await broker.save();
        }

        console.log("Client registered successfully:", newClient._id);
        return res.json({ redirect: url });
      }

      case "broker": {
        const newBroker = new Broker({
          name,
          email: normalizedEmail,
          number,
          password, // hashed by pre-save hook
          brokerId: `BRK${Date.now()}`, // unchanged logic
        });

        await newBroker.save();

        console.log("Broker registered successfully:", newBroker.brokerId);
        return res.json({ redirect: url });
      }

      default:
        console.log("Signup failed: Invalid role");
        return res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// otp generator
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// otp sender
export const SendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    const pattern = /^[0-9]{10}$/; // pattern
    let num_a = await Admin.findOne({ number })
    let num_c = await Client.findOne({ number })
    let num_b = await Broker.findOne({ number })

    if (!pattern.test(number)) return res.json({ message: "invalid number passed" })

    if ( num_a || num_b || num_c ) {
      return res.status(409).json({ message: "Already existing user" });
    }

    if (!num_a && !num_b && !num_c) {
      const otp = generateOTP();
      // ✅ STORE OTP WITH EXPIRY
    otp_data[number] = {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
    };

      const whatsapp_url = `https://graph.facebook.com/v20.0/${process.env.MOBILE_ID}/messages`;

      await axios.post(
        whatsapp_url,
        {
          messaging_product: "whatsapp",
          to: `91${number}`,
          type: "template",
          template: {
            name: "delivery",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [{ type: "text", text: otp }],
              },
              {
                type: "button",
                sub_type: "url",    // url button (Meta calls it URL)
                index: 0,           // index 0 -> first button
                parameters: [
                  { type: "text", text: "otp" }
                  // <- fill with the actual URL your template expects
                ]
              }
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKENS}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// otp verification
export const verifyOTP = async (req, res) => {
  const { number, otp } = req.body;

  if (!number || !otp) {
    return res.status(400).json({ message: "Number and OTP required" });
  }

  const record = otp_data[number];

  // ❌ No OTP found
  if (!record) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  // ❌ OTP expired
  if (record.expiresAt < Date.now()) {
    delete otp_data[number];
    return res.status(400).json({ message: "OTP expired" });
  }

  // ❌ OTP mismatch
  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // ✅ OTP verified
  delete otp_data[number]; // one-time use

  return res.json({ message: "OTP verified successfully" });
};

// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// login handler
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     console.log({"Login failed": "credentials not provided"});
      return res.status(400).json({ message: "Email and password required"});
    }

    const Email = email.toLowerCase().trim(); // CHANGED
    console.log(Email, password)

    // CHANGED: fixed broken else-if chain (CRITICAL BUG)
     let  user = await Client.findOne({ email : Email });
     let  role = "client";
     let  redirect = "/client";
      console.log({"c" : user})
    if (!user) {
      user = await Broker.findOne({ email : Email });
      role = "broker";
      redirect = "/broker";
      console.log({"b" : user})
    }

    if (!user) {
    user = await Admin.findOne({ email : Email });
    role = "admin";
    redirect = "/admin";
    console.log({"a" : user})
    }

    if (!user) {
      console.log("Login failed: User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      console.log("Login failed: Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`Login successful: ${role} - ${user._id}`);
    return res.json(redirect);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// logout handeler
// export const Logouthandaler = async (req, res) => {
//   try{
//   }catch(e){
//     return res.json({message : `${e}`})
//   }
// }
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// profile handeler
export const profileHandler = async(req, res, filtredtoken) => {
  const user_id = filtredtoken;
  if(!user_id) {
    return res.json({message : "failed to authenticate user profile handaler"})
  }
  const client = await Client.findById({_id : user_id});
  if(client) {
    return res.json(client);
  };
  const broker = await Broker.findById({_id : user_id})
    if(broker) {
    return res.json(broker);
  };
  const admin = await Admin.findById({_id : user_id})
    if(admin) {
    return res.json(admin);
  };
}
// ----------------------------------------------------------------------------------------------------------------------