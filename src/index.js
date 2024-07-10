const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const logger = require('./config/logger');
let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log('Database connected successfully');
  server = app.listen(config.port, () => {
    console.log(`App is running on por ${config.port}`);
  });
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
