const express = require('express');
const { Logger } = require('motifer');

const logger = Logger.getLogger(__filename);
const router = express.Router();

router.get('/', async (req, res) => {
  logger.info('Inside health API route.');
  res.statusMessage = 'Service is running.';

  return res.status(200).json({ message: 'Service is running' });
});

module.exports = router;
