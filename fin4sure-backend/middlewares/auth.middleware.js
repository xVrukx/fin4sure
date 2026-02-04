// --------------------------------- imports ---------------------------------
import { verifyToken } from "../utils/jwt.utils.js";
import Client from "../models/client.model.js";
import Broker from "../models/broker.model.js";
import Admin from "../models/admin.model.js";
// ---------------------------------------------------------------------------


export const verifyUser = async (req, res, next) => {
  try {
    // ✅ 1. Read token from cookies
    const accessToken = req.cookies?.AccessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // ✅ 2. Verify and decode JWT (RSA verification)
    const decoded = verifyToken(accessToken);
    // decoded => { _id, role, iat, exp }

    const { _id, role } = decoded;

    // ✅ 3. Fetch user based on role
    let user;

    if (role === "client") {
      user = await Client.findById(_id);
    } else if (role === "broker") {
      user = await Broker.findById(_id);
    } else if (role === "admin") {
      user = await Admin.findById(_id);
    } else {
      return res.status(401).json({ message: "Invalid role" });
    }

    // ✅ 4. Ensure user still exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ 5. Attach user info to request
    req.user = {
      _id: user._id,
      role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const isBroker = (req, res, next) => {
  if (req.user?.role !== "broker") {
    return res.status(403).json({ message: "Broker access only" });
  }
  next();
};

export const isClient = (req, res, next) => {
  if (req.user?.role !== "client") {
    return res.status(403).json({ message: "Client access only" });
  }
  next();
};
