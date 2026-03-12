const Tenant = require("../models/Tenant");
const { ApiError } = require("../utils/ApiError");

const createTenant = async ({ name }) => {
  const existing = await Tenant.findOne({ name: name.trim() });
  if (existing) {
    throw new ApiError(409, "Tenant already exists");
  }

  const tenant = await Tenant.create({ name: name.trim() });
  return tenant;
};

module.exports = { createTenant };
