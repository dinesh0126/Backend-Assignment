const { ApiError } = require("../utils/ApiError");

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, "Route not found"));
};

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const payload = {
    message: err.message || "Internal server error",
  };

  if (err.details) {
    payload.details = err.details;
  }

  res.status(status).json(payload);
};

module.exports = { notFoundHandler, errorHandler };
