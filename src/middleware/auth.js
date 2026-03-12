const { verifyToken } = require("../services/auth.service");
const { ApiError } = require("../utils/ApiError");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "Authorization token required"));
  }

  const payload = verifyToken(token);
  req.user = {
    id: payload.sub,
    tenantId: payload.tenantId,
    email: payload.email,
  };

  next();
};

module.exports = { authMiddleware };
