const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");

const signToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

module.exports = { signToken, verifyToken };
