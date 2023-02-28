const config = require('config');
const { ExpressLoggerFactory } = require('motifer');
const app = require('express')();
const db = require('./../utils/mongodb-connection');

const { serviceName } = config.get('server');

const motiferLogger = () => {
  const Logger = new ExpressLoggerFactory(
    serviceName,
    config.get('logs.level'),
    app
  );
  Logger.getLogger(__filename);
};

const initializeServices = async () => {
  const response = {};
  motiferLogger();
  db.mongodb();
  response.app = app;

  return response;
};

module.exports = {
  initializeServices
};
