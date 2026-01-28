import express from "express"
import Admin from "../models/admin.model.js"
import Broker from "../models/broker.model.js"
import Client from "../models/client.model.js"

const signUpHandler = async (req,res) => {
    const {name,email,number,password,role} = req.body;
    if ( !name.trim()||~email.trim()||!password.trim()||!role.trim()||!number.tim()) {
        return console.log({"signup_handeler log" : "one of the fields were not provided during body extraction"});  
    }
    
    const url = "/login"
    const client = Client.find({number,email});
    const broker = Broker.find({number,email});
    const admin = Admin.find({number,email});
    
    if (client||broker||admin) {
        return console.log({"sigup_handeler log":"user already exist"});
    }

    switch (role) {
        case "client":
            const newClient = new Client({name,email,password,number});
            newClient.save()
            res.json(url)
            
            break;
        case "broker":
            const newBroker = new Broker({name,email,password,number});
            newClient.save()
            res.json(url)
            break;
    
        default:
            break;
    }
    
}

const otp_data = {}

const generateOTP = () => {
 return Math.floor(1000 + Math.random()*9000).toString();
}

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
    
}