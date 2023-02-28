const config = require('config');
const logger = require('motifer').Logger.getLogger(__filename);
const routes = require('./src/routes');
const { exceptionHandler } = require('./src/utils/exception-handler');
const { initializeServices } = require('./src/startup');
const middlewares = require('./src/middlewares');

const createApp = async () => {
  const { app } = await initializeServices();
  app.use(middlewares.router);
  app.use('/', routes);
  app.use(exceptionHandler);
  app.listen(config.get('server.port'), () => {
    logger.info(`App started on port ${config.get('server.port')}`);
  });
};

if (require.main === module) {
  createApp().catch((err) => logger.error(`Error while starting app: ${err}`));
}
