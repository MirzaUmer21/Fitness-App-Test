const Joi = require('joi');

const packageValidation = Joi.object().keys({
  package_name: Joi.string().required(),
  package_description: Joi.string().required(),
  price: Joi.string().required(),
  package_type: Joi.string()
    .required()
    .valid('onsite_training', 'onsite_premium_training', 'online_training'),
  plan_duration: Joi.string().required(),
  training_duration: Joi.string().required()
});
module.exports = { packageValidation };
