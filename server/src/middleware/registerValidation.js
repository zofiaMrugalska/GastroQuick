const Joi = require("joi");
const createResponse = require("../services/responseDTO");

const registerUserSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

function validateUserData(req, res, next) {
  const result = registerUserSchema.validate(req.body);
  console.log(result, "reqbodyyy");

  if (result.error) {
    return res.status(400).json(createResponse(false, null, "validation error"));
  }

  next();
}

module.exports = validateUserData;
