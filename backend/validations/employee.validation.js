const Joi = require("joi");

const employeeSchema = Joi.object({
  first_name: Joi.string().optional(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().optional(),
  hire_date: Joi.date().required(),
  job_id: Joi.string().optional(),
  salary: Joi.number().precision(2).optional()
});

module.exports = { employeeSchema };
