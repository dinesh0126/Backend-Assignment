const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const tenantRoutes = require("./routes/tenant.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const API_PREFIX = "/api/v1";

app.use(`${API_PREFIX}/tenants`, tenantRoutes);
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
