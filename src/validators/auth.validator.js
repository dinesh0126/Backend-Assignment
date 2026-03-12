const Joi = require("joi");

const registerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    tenantId: Joi.string().hex().length(24).required(),
  }).required(),
  params: Joi.object().required(),
  query: Joi.object().required(),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
  }).required(),
  params: Joi.object().required(),
  query: Joi.object().required(),
});

module.exports = { registerSchema, loginSchema };
