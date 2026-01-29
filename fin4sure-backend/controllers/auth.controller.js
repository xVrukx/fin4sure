// ----------------------------------------------------------------------------------------------------------------------
// imports
import express from "express";
import Admin from "../models/admin.model.js"
import Broker from "../models/broker.model.js"
import Client from "../models/client.model.js"
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// global variables
const url = "/login"
const otp_data = {}
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// singup handeler
export const signUpHandler = async (req, res) => {
  try {
    const { name, email, number, password, role, broker_id } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !number?.trim() ||
      !password?.trim() ||
      !role?.trim()
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingClient = await Client.findOne({ $or: [{ number }, { email }] });
    const existingBroker = await Broker.findOne({ $or: [{ number }, { email }] });
    const existingAdmin = await Admin.findOne({ $or: [{ number }, { email }] });

    if (existingClient || existingBroker || existingAdmin) {
      return res.status(409).json({ message: "User already exists" });
    }

    switch (role) {
      case "client": {
        const newClient = new Client({
          name,
          email,
          number,
          password,
          broker_id: broker_id || "self",
        });

        await newClient.save(); // password gets hashed by pre-save hook

        // If referred by broker, attach client to broker
        if (broker_id && broker_id !== "self") {
          const broker = await Broker.findOne({ brokerId: broker_id });

          if (!broker) {
            return res.status(400).json({ message: "Invalid Broker ID" });
          }

          broker.clients.push(newClient._id.toString());
          await broker.save();
        }

        return res.json({ redirect: "/login" });
      }

      case "broker": {
        const newBroker = new Broker({
          name,
          email,
          number,
          password,
          brokerId: `BRK${Date.now()}`, // simple unique broker id
        });

        await newBroker.save();
        return res.json({ redirect: "/login" });
      }

      default:
        return res.status(400).json({ message: "Invalid role" });
    }
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// otpgenerater
const generateOTP = () => {
 return Math.floor(1000 + Math.random()*9000).toString();
}
// ----------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------------------------
// otpsender
export const SendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    let num_a = await Admin.findOne({ number })
    let num_c = await Client.findOne({ number })
    let num_b = await Broker.findOne({ number })

    if ( num_a || num_b || num_c ) {
      return res.json("Already existing user")
    }

    if (!num_a && !num_b && !num_c) {
      const pattern = /^[0-9]{10}$/; // pattern
      const otp = generateOTP();
      otp_data[number] = otp;

      if (!pattern.test(number)) return res.json({ message: "invalid number passed" })

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

export const verifyOTP = async (req, res) => {
    const {number, otp} = req.body;
    if(!number || !otp) {
      return console.log({"sendotp" : "no valid number or otp or both provided"});
    };
    console.log({"verifyotp log" : "valid otp and number provided"});
    if(otp_data[number] !== otp){
      return console.log({"verifyotp log" : "otp is incorrect please provide a valid otp"});
    };
    console.log({"verifyotp log" : "number verified by otp succesfully"});
    res.json(url)
}

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await Broker.findOne({ email });
      role = "broker";
    }

    if (!user) {
      user = await Client.findOne({ email });
      role = "client";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.json({
      success: true,
      role,
      redirect: role === "admin" ? "/admin" : "/",
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
