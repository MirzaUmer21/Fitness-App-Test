const sendResponse = (req, res, next) => {
  res.Response = (data, message = 'success', status = 200) => {
    res.status(status).send({ data, message });
  };
  next();
};

module.exports = sendResponse;
