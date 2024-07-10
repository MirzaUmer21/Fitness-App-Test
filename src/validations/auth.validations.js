const Joi = require('joi');

const registerUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
  name: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().integer().min(18).max(100).required(),
  location: Joi.object().keys({
    type: Joi.string().valid('Point').required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required()
  }),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  date_of_birth: Joi.date().iso().required(),
  phone_number: Joi.string()
    .required()
    .pattern(/^[0-9]{10,15}$/)
    .error(
      new Error('Phone number must be a valid number with 10 to 15 digits')
    )
});
const registerAdminValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~])/,
      { name: 'password' }
    )
    .error(
      new Error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
      )
    ),
  name: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  age: Joi.number().integer().min(18).max(100).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  date_of_birth: Joi.date().iso().required(),
  phone_number: Joi.string()
    .required()
    .pattern(/^[0-9]{10,15}$/)
    .error(
      new Error('Phone number must be a valid number with 10 to 15 digits')
    )
});

const loginUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

const refreshTokenValidation = Joi.object().keys({
  user_id: Joi.string().required(),
  refresh_token: Joi.string().required()
});
module.exports = {
  registerUserValidation,
  loginUserValidation,
  refreshTokenValidation,
  registerAdminValidation
};
