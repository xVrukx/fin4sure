// --------------------------------- imports ---------------------------------
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
// ---------------------------------------------------------------------------


// --------------------------------- load RSA keys (once at startup) ---------
let privateKey;
let publicKey;

try {
  privateKey = fs.readFileSync(
    path.join(process.cwd(), "./Keys", "private.key"),
    "utf8"
  );

  publicKey = fs.readFileSync(
    path.join(process.cwd(), "./Keys", "public.key"),
    "utf8"
  );
} catch (err) {
  console.error("❌ Failed to load JWT keys:", err.message);
  process.exit(1); // 🚨 app must not run without keys
}
// ---------------------------------------------------------------------------


// --------------------------------- sign access token -----------------------
export const signAccessToken = (payload) => {
  try {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid JWT payload");
    }

    return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d", // ✅ short-lived access token
    });
  } catch (err) {
    console.error("❌ Error signing access token:", err.message);
    throw new Error("ACCESS_TOKEN_SIGN_FAILED");
  }
};
// ---------------------------------------------------------------------------


// --------------------------------- sign refresh token ----------------------
export const signRefreshToken = (payload) => {
  try {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid JWT payload");
    }

    return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d", // ✅ long-lived refresh token
    });
  } catch (err) {
    console.error("❌ Error signing refresh token:", err.message);
    throw new Error("REFRESH_TOKEN_SIGN_FAILED");
  }
};
// ---------------------------------------------------------------------------


// --------------------------------- verify token ----------------------------
export const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error("Token not provided");
    }

    return jwt.verify(token, publicKey, {
      algorithms: ["RS256"], // 🔐 algorithm pinning
    });
  } catch (err) {
    // Normalize JWT errors (important for middleware)
    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError" ||
      err.name === "NotBeforeError"
    ) {
      throw new Error("INVALID_OR_EXPIRED_TOKEN");
    }

    console.error("❌ Token verification failed:", err.message);
    throw new Error("TOKEN_VERIFICATION_FAILED");
  }
};
// ---------------------------------------------------------------------------
