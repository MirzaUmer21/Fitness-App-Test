const { default: mongoose, Types } = require('mongoose');

const adminSchema = mongoose.Schema(
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

adminSchema.index({ location: '2dsphere' });
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
