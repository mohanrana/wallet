/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const { Response } = require('./responses');

exports.exceptionHandler = (err, req, res, next) => {
  logger.debug('Exception handler invoked.', err.message);
  if (err.statusCode === 400) {
    res.statusMessage = err.statusMessage || 'Invalid request body supplied';

    return res.status(400).json(new Response(err.message));
  }
  if (err.statusCode === 404) {
    res.statusMessage = err.statusMessage || 'Requested URL not found';

    return res.status(404).json(new Response(err.message));
  }

  res.statusMessage = err.statusMessage || 'An internal server error occurred';

  return res.status(500).json(new Response(err.message));
};
