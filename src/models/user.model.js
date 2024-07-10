const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
      private: true
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    OTP: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  const userJson = _.pick(userObject, [
    '_id',
    'email',
    'role',
    'isEmailVerified'
  ]);
  return userJson;
};
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
