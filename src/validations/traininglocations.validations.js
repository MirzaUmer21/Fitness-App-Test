const Joi = require('joi');

const trainingLocationValidation = Joi.object().keys({
  address: Joi.string().required(),
  city: Joi.string().required(),
  zip_code: Joi.string().required(),
  state: Joi.string().required(),
  location: Joi.object()
    .keys({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required()
    })
    .required()
});

module.exports = { trainingLocationValidation };
