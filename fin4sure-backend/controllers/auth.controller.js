// ----------------------------------------------------------------------------------------------------------------------
// imports
import Admin from "../models/admin.model.js";
import bclient from "../models/bclient.js";
import Broker from "../models/broker.model.js";
import Client from "../models/client.model.js";
import Lead from "../models/lead.model.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.utlis.js";
import axios from "axios";
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// global variables
const url = "/login";
const otp_data = {}; // CHANGED: store as object instead of raw OTP (future-safe)
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes
// PAN should be 5 letters, 4 digits, 1 letter (A-Z)
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// signup handler
export const signUpHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      number,
      password,
      role,
      ref_id,
      dob,
      address,
      pincode,
      state,
      district
    } = req.body; //still under work

    // CHANGED: fixed validation typos, logic & ensured response is sent
    if (
      !name?.trim() ||
      !gender?.trim()||
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
        let broker = null;
        let broker_id = null;

        if (number) {
          const Bclient = await bclient.findOne({ number });

          // If found → attach broker
          if (Bclient) {
            broker_id = Bclient.broker_id;

            broker = await Broker.findOne({ brokerId: broker_id }); // check field name

            if (!broker) {
              return res.status(404).json({ message: "Broker not found" });
            }

            if (broker.status !== "approved") {
              return res.status(403).json({
                message:
                  broker.status === "pending"
                    ? "Broker not approved yet"
                    : "Broker inactive",
              });
            }
          }
        }

        // Create client ONLY ONCE
        const client = new Client({
          client_id: `cli${Date.now()}`,
          name,
          email: normalizedEmail,
          gender,
          number,
          password,
          ref_id,
          broker_id: broker_id, // will be null if no match
        });

        await client.save();

        // Only update broker if it exists
        if (broker) {
          broker.clients.push(client._id.toString());
          await broker.save();
        }

        return res.json({ redirect: url });
      }
      case "broker": {
        const newBroker = new Broker({
          name,
          email: normalizedEmail,
          gender,
          number,
          password, // hashed by pre-save hook
          brokerId: `BRK${Date.now()}`, // unchanged logic
          dob: dob,
          address: address,
          pincode: pincode,
          district: district,
          state: state
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
    let num_a = await Admin.findOne({ number });
    let num_c = await Client.findOne({ number });
    let num_b = await Broker.findOne({ number });

    if (!pattern.test(number))
      return res.status(400).json({ message: "Invalid number passed" });

    if (num_a || num_b || num_c) {
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
                sub_type: "url", // url button (Meta calls it URL)
                index: 0, // index 0 -> first button
                parameters: [
                  { type: "text", text: "otp" },
                  // <- fill with the actual URL your template expects
                ],
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOKENS}`,
            "Content-Type": "application/json",
          },
        },
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
      return res.status(400).json({ message: "Email and password required" });
    }

    const Email = email.toLowerCase().trim();

    let user = await Client.findOne({ email: Email });
    let role = "client";

    if (!user) {
      user = await Broker.findOne({ email: Email });
      role = "broker";
    }

    if (!user) {
      user = await Admin.findOne({ email: Email });
      role = "admin";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = signAccessToken({
      _id: user._id,
      role,
    });

    return res
      .cookie("AccessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role,
      });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// logout handeler
export const Logouthandaler = async (req, res) => {
  try {
    const AccessToken = req.cookies.AccessToken;
    if (!AccessToken) {
      return res.status(500).json({ message: "accesstoken not found" });
    }
    res
      .clearCookie("AccessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "Logged out successfully" });
  } catch (e) {
    return res.json({ message: `${e}` });
  }
};
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// send OTP for updating number (uses SAME otp_data + WhatsApp logic)
export const sendUpdateNumberOTP = async (req, res) => {
  try {
    const { number } = req.body;

    if (!/^[0-9]{10}$/.test(number)) {
      return res.status(400).json({ message: "Invalid number" });
    }

    // ❌ new number must not exist
    const exists =
      (await Client.findOne({ number: number })) ||
      (await Broker.findOne({ number: number })) ||
      (await Admin.findOne({ number: number }));

    if (exists) {
      return res.status(409).json({ message: "Number already in use" });
    }

    const otp = generateOTP();

    otp_data[`update_${number}`] = {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_TIME,
    };

    // ✅ SAME WhatsApp logic you already use
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
              sub_type: "url", // url button (Meta calls it URL)
              index: 0, // index 0 -> first button
              parameters: [
                { type: "text", text: "otp" },
                // <- fill with the actual URL your template expects
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKENS}`,
          "Content-Type": "application/json",
        },
      },
    );

    return res.json({ message: "OTP sent to new number" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// verify OTP for updating number
export const verifyUpdateNumberOTP = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { number, otp } = req.body;

    if (!number || !otp) {
      return res.status(400).json({ message: "Number and OTP required" });
    }

    const record = otp_data[`update_${number}`];

    if (!record) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (record.expiresAt < Date.now()) {
      delete otp_data[`update_${number}`];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    delete otp_data[`update_${number}`];

    return res.json({ message: "OTP verified" });
  } catch (err) {
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// profile handeler
export const profileHandler = async (req, res) => {
  const user_id = req.user._id;
  const role = req.user.role;

  if (!user_id) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  let user;

  if (role === "client") {
    user = await Client.findById(user_id).select("-password -__v");
  }

  if (role === "broker") {
    user = await Broker.findById(user_id).select("-password -__v");
  }

  if (role === "admin") {
    user = await Admin.findById(user_id).select("-password -__v");
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // ✅ unified response for ALL roles
  return res.json({
    role,
    name: user.name,
    email: user.email,
    number: user.number,
    ...(role === "client" && {
      broker: user.broker_id,
      dob : user.dob,
      gender : user.gender,
      address : user.address,
      state: user.state,
      district: user.district,
      pincode: user.pincode,
      totalProducts: user.product.length,
      products: user.product,
    }),
    ...(role === "broker" && {
      brokerId: user.brokerId,
      dob : user.dob,
      address : user.address,
      state: user.state,
      district: user.district,
      pincode: user.pincode,
      status: user.status,
    }),
  });
};
// ----------------------------------------------------------------------------------------------------------------------
// profileupdate handeler

export const profileUpdateHandeler = async (req, res) => {
  const user_id = req.user._id;
  const role = req.user.role;

  if (!user_id) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // ------------------ COMMON SETUP ------------------
  const filter = req.user._id;
  const callback = { new: true };
  const updates = { $set: {} };

  try {
    if (role === "client") {
      const {
        name,
        email,
        address,
        pincode,
        district,
        state,
        number,
        otp_verified
      } = req.body;

      // ------------------ NAME ------------------
      if (name) updates.$set.name = name.trim();

      // ------------------ EMAIL ------------------
      if (email) {
        const normalizedEmail = email.toLowerCase().trim();
        const emailExists = await Client.findOne({_id : filter, email: normalizedEmail});
        if (!emailExists)
          return res.status(409).json({ message: "Email already in use" });
        updates.$set.email = normalizedEmail;
      }

      if(address) {
        updates.$set.address = address;
      }

      if(pincode) {
        updates.$set.pincode = pincode;
      }

      if(state) {
        updates.$set.state = state;
      }

      if(district) {
        updates.$set.district = district;
      }

      // ------------------ NUMBER ------------------
      if (number) {
        const client = await Client.findById(user_id); // fetch current client
        if (number !== client.number) {
          // only require OTP if number is changing
          if (!otp_verified)
            return res
              .status(400)
              .json({ message: "You must verify OTP to update number" });

          const numberExists = await Client.findOne({
            number,
            _id: { $ne: user_id },
          });
          if (numberExists)
            return res.status(409).json({ message: "Number already in use" });

          if (!/^[0-9]{10}$/.test(number))
            return res.status(400).json({ message: "Invalid phone number" });

          updates.$set.number = number;
        }
      }

      
      console.log(updates)
      // ------------------ UPDATE CLIENT ------------------
      const client = await Client.findByIdAndUpdate(
        filter,
        updates,
        callback,
      ).select("-password -__v");
      return res.json(client);
    }

    // ------------------ BROKER ------------------
    if (role === "broker") {
      const {
        name,
        email,
        address,
        pincode,
        district,
        state,
        number
      } = req.body;

      if (name) updates.$set.name = name.trim();

      if (email) {
        const normalizedEmail = email.toLowerCase().trim();
        const emailExists = await Broker.findOne({
          email: normalizedEmail,
          _id: { $ne: user_id },
        });
        if (emailExists)
          return res.status(409).json({ message: "Email already in use" });
        updates.$set.email = normalizedEmail;
      }
      
      if(address) {
        updates.$set.address = address;
      }

      if(pincode) {
        updates.$set.pincode = pincode;
      }

      if(district) {
        updates.$set.district = district;
      }

      if(state) {
        updates.$set.state = state;
      }

      if (number) {
        const numberExists = await Broker.findOne({
          number,
          _id: { $ne: user_id },
        });
        if (numberExists)
          return res.status(409).json({ message: "Number already in use" });

        if (!/^[0-9]{10}$/.test(number))
          return res.status(400).json({ message: "Invalid phone number" });

        updates.$set.number = number;
      }

      const broker = await Broker.findByIdAndUpdate(
        filter,
        updates,
        callback,
      ).select("-password -__v");
      return res.json(broker);
    }

    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
