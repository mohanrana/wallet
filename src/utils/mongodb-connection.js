/* eslint-disable import/newline-after-import */
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const mongoose = require('mongoose');
const config = require('config');

const { uri, username, password } = config.get('database');

exports.mongodb = async () => {
  const options = {
    user: username,
    pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(uri, options);

  mongoose.connection.on('connected', () => {
    logger.info('Mongoose default connection is open to', uri);
  });

  mongoose.connection.on('error', (err) => {
    logger.error('Mongoose default connection error has occured', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Mongoose default connection is disconnected due to application termination');
      process.exit(1);
    });
  });
};
