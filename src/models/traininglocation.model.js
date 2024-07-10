const { default: mongoose, Types } = require('mongoose');

const trainingLocationSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip_code: {
      type: String,
      required: true
    },
    state: {
      type: String,
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
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

trainingLocationSchema.index({ location: '2dsphere' });
const TrainingLocation = mongoose.model(
  'TrainingLocation',
  trainingLocationSchema
);
module.exports = TrainingLocation;
