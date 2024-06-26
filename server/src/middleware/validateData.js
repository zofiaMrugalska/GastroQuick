const Joi = require("joi");
const createResponse = require("../services/responseDTO");

const registerUserSchema = Joi.object({
  name: Joi.string().min(4).max(20).required().messages({
    "string.base": 'Field "name" should be a text type',
    "string.empty": 'Field "name" cannot be empty',
    "string.min": 'Field "name" must contain at least 4 characters',
    "string.max": 'Field "name" can contain a maximum of 20 characters',
    "any.required": 'Field "name" is required',
  }),
  email: Joi.string().email().required().messages({
    "string.base": 'Field "email" should be a text type',
    "string.empty": 'Field "email" cannot be empty',
    "string.email": 'Field "email" must be a valid e-mail address',
    "any.required": 'Field "email" is required',
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": 'Field "password" should be a text type',
    "string.empty": 'Field "password" cannot be empty',
    "string.min": 'Field "password" must contain at least 8 characters',
    "any.required": 'Field "password" is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": 'Field "confirmPassword" must match the "password"',
  }),
});

const commentSchema = Joi.object({
  comment: Joi.string().required().min(1).max(100).messages({
    "string.base": 'Field "comment" should be a text type',
    "string.empty": 'Field "comment" cannot be empty',
    "string.min": 'Field "comment" must contain at least 1 characters',
    "string.max": 'Field "comment" can contain a maximum of 100 characters',
    "any.required": 'Field "comment" is required',
  }),
  meal: Joi.string().required(),
});

const validateNewPasswordSchema = Joi.object({
  resetPasswordVerificationCode: Joi.string().required(),
  newPassword: Joi.string().min(4).max(20).required().messages({
    "string.base": 'Field "password" should be a text type',
    "string.empty": 'Field "password" cannot be empty',
    "string.min": 'Field "password" must contain at least 4 characters',
    "string.max": 'Field "password" can contain a maximum of 20 characters',
    "any.required": 'Field "password" is required',
  }),
});

function validateUserData(req, res, next) {
  const result = registerUserSchema.validate(req.body);

  if (result.error) {
    console.log(result.error.details);
    return res.status(400).json(createResponse(false, null, result.error.details[0].message));
  }

  next();
}

function validateComment(req, res, next) {
  const result = commentSchema.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    return res.status(400).json(createResponse(false, null, result.error.details[0].message));
  }

  next();
}

function validateNewPassword(req, res, next) {
  const result = validateNewPasswordSchema.validate(req.body);

  if (result.error) {
    console.log(result.error.details);
    return res.status(400).json(createResponse(false, null, result.error.details[0].message));
  }

  next();
}

module.exports = { validateUserData, validateComment, validateNewPassword };
