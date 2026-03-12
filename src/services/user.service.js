const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Tenant = require("../models/Tenant");
const { ApiError } = require("../utils/ApiError");

const createUser = async ({ name, email, password, tenantId }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const tenant = await Tenant.findById(tenantId);
  if (!tenant) {
    throw new ApiError(404, "Tenant not found");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, tenantId });
  return user;
};

const verifyUserCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  return user;
};

module.exports = { createUser, verifyUserCredentials };
