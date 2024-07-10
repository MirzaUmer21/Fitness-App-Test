const ApiError = require('../utils/catchAPIError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  console.log(err);
};
module.exports = errorHandler;
