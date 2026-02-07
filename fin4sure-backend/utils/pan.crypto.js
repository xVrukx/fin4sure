import crypto from "crypto";

const ALGO = "aes-256-cbc";

function getKey() {
  const secret = process.env.PAN_SECRET;

  if (!secret) {
    throw new Error("PAN_SECRET not set in environment");
  }

  return crypto
    .createHash("sha256")
    .update(secret)
    .digest();
}

// 🔐 encrypt PAN
export function encryptPAN(pan) {
  const key = getKey();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGO, key, iv);

  let encrypted = cipher.update(pan, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

// 🔍 deterministic hash for duplicate detection
export function hashPAN(pan) {
  return crypto
    .createHash("sha256")
    .update(pan)
    .digest("hex");
}

// 👁️ masked PAN for UI
export function maskPAN(pan) {
  return pan.slice(0, 5) + "****" + pan.slice(-1);
}
