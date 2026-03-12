const express = require("express");
const { validate } = require("../middleware/validate");
const { tenantCreateSchema } = require("../validators/tenant.validator");
const { createTenantHandler } = require("../controllers/tenant.controller");

const router = express.Router();

router.post("/", validate(tenantCreateSchema), createTenantHandler);

module.exports = router;
