const { default: mongoose, Types } = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    location: {
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
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    phone_number: {
      type: String,
      required: true,
      validate(value) {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(value)) {
          throw new Error(
            'Phone number must be a valid number with 10 to 15 digits'
          );
        }
      }
    }
  },
  {
    timestamps: true
  }
);

customerSchema.index({ location: '2dsphere' });
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
