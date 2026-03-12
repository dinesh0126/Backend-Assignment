const { asyncHandler } = require("../utils/asyncHandler");
const { createTenant } = require("../services/tenant.service");

const createTenantHandler = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const tenant = await createTenant({ name });

  res.status(201).json({
    tenant: {
      id: tenant._id,
      name: tenant.name,
    },
  });
});

module.exports = { createTenantHandler };
