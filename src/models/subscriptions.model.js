const { default: mongoose, Types } = require('mongoose');

const subscriptionsSchema = mongoose.Schema(
  {
    user_id: {
      type: Types.ObjectId,
      required: true
    },
    package_id: {
      type: Types.ObjectId,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: Boolean,
      required: true
    },
    fitnessGoal: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['subscribed', 'unsubscribed', 'blocked', 'payment_pending']
    },
    user_location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    },
    selected_admin_location: {
      type: Types.ObjectId
    },
    selected_time_slot: {
      type: Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);
const Subscription = mongoose.model('Subscription', subscriptionsSchema);
module.exports = Subscription;
