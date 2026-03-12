const Joi = require("joi");

const projectCreateSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(2000).allow("").optional(),
    status: Joi.string().valid("planned", "in_progress", "completed", "archived").optional(),
  }).required(),
  params: Joi.object().required(),
  query: Joi.object().required(),
});

const projectUpdateSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(2).max(200).optional(),
    description: Joi.string().max(2000).allow("").optional(),
    status: Joi.string().valid("planned", "in_progress", "completed", "archived").optional(),
  }).min(1).required(),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }).required(),
  query: Joi.object().required(),
});

const projectIdSchema = Joi.object({
  body: Joi.object().required(),
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }).required(),
  query: Joi.object().required(),
});

module.exports = { projectCreateSchema, projectUpdateSchema, projectIdSchema };
