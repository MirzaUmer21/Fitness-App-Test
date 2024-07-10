const { default: mongoose } = require('mongoose');
const { tokenTypes } = require('../config/token');

const packagesSchema = mongoose.Schema(
  {
    package_name: {
      type: String,
      required: true
    },
    package_type: {
      type: String,
      required: true,
      enum: ['onsite_training', 'onsite_premium_training', 'online_training']
    },
    package_description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    plan_duration: {
      type: String,
      required: true
    },
    training_duration: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Package = mongoose.model('Package', packagesSchema);
module.exports = Package;
