const express = require('express');
const { v1_routes } = require('./routes');
const errorHandler = require('./middleware/errors');
const { default: helmet } = require('helmet');
const sendResponse = require('./middleware/response');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(sendResponse);
v1_routes(app);

app.use(errorHandler);

module.exports = app;
