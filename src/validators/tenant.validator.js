const Joi = require("joi");

const tenantCreateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
  }).required(),
  params: Joi.object().required(),
  query: Joi.object().required(),
});

module.exports = { tenantCreateSchema };
