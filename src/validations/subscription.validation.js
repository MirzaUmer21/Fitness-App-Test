const Joi = require('joi');
const { Types } = require('mongoose');

const subscriptionValidation = Joi.object().keys({
  user_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid user_id');
      }
      return value;
    }),
  package_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid package_id');
      }
      return value;
    }),
  price: Joi.string().required(),
  paymentStatus: Joi.boolean().required(),
  fitnessGoal: Joi.string().required(),
  selected_admin_location: Joi.string().optional().allow(''),
  selected_time_slot: Joi.string().optional().allow(''),
  user_location: Joi.object()
    .keys({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array().items(Joi.number()).length(2).required()
    })
    .optional(),

  status: Joi.string()
    .required()
    .valid('subscribed', 'unsubscribed', 'blocked', 'payment_pending')
});

module.exports = {
  subscriptionValidation
};
