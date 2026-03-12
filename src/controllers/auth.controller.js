const { createUser, verifyUserCredentials } = require("../services/user.service");
const { signToken } = require("../services/auth.service");
const { asyncHandler } = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, tenantId } = req.body;
  const user = await createUser({ name, email, password, tenantId });

  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
    tenantId: user.tenantId,
  });

  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      tenantId: user.tenantId,
    },
    token,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await verifyUserCredentials({ email, password });

  const token = signToken({
    sub: user._id.toString(),
    email: user.email,
    tenantId: user.tenantId,
  });

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      tenantId: user.tenantId,
    },
    token,
  });
});

module.exports = { register, login };
