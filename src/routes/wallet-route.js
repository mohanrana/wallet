/* eslint-disable consistent-return */
/* eslint-disable import/newline-after-import */
const express = require('express');
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const walletService = require('../services/wallet-service');
const validation = require('../validations/wallet-validator');

const router = express.Router();

router.post('/', async (req, res, next) => {
  logger.info('Inside create new wallet API route.');
  const errors = await validation.createNewWallet(req);
  if (!errors.isEmpty()) {
    logger.debug('Validation Errors are:', errors);

    return next({ message: errors.array()[0].msg, statusCode: 400 });
  }
  try {
    const response = await walletService.createWallet(req.body);
    res.statusMessage = 'Wallet has been created.';

    return res.status(201).json(response);
  } catch (error) {
    logger.error('The exception ', error.message);
    error.statusCode = 500;
    next(error);
  }
});

router.get('/:walletId?', async (req, res, next) => {
  logger.info('Inside get wallet API route.');
  const errors = await validation.fetchWallet(req);
  if (!errors.isEmpty()) {
    logger.debug('Validation Errors are:', errors);
    const response = {
      message: errors.array()[0].msg,
      statusCode: 404,
      statusMessage: 'Wallet not found'
    };

    return next(response);
  }
  try {
    const response = await walletService.getWallet(req.params);
    res.statusMessage = 'The wallet was fetched successfully';

    return res.json(response);
  } catch (error) {
    logger.error('The exception ', error.message);
    const errResponse = error;
    if (
      error.message.includes('failed for value')
      || error.message.includes('WalletId not')
    ) {
      errResponse.statusCode = 404;
      errResponse.message = 'Wallet not exist.';
      errResponse.statusMessage = 'Wallet not found';
    }

    next(errResponse);
  }
});

router.post('/:walletId?/transactions', async (req, res, next) => {
  logger.info('Inside create transaction API route.');
  const errors = await validation.createTransaction(req);
  if (!errors.isEmpty()) {
    logger.debug('Validation Errors are:', errors);
    const response = {
      message: errors.array()[0].msg,
      statusCode: 404,
      statusMessage: 'Wallet not found'
    };

    return next(response);
  }
  try {
    const response = await walletService.createTransaction(req);
    res.statusMessage = 'Transaction has been created';

    return res.status(201).json(response);
  } catch (error) {
    logger.error('The exception ', error.message);
    error.statusCode = 500;
    next(error);
  }
});

router.get('/:walletId?/transactions', async (req, res, next) => {
  logger.info('Inside fetch transaction API route.');
  const errors = await validation.fetchWallet(req);
  if (!errors.isEmpty()) {
    logger.debug('Validation Errors are:', errors);
    const response = {
      message: errors.array()[0].msg,
      statusCode: 404,
      statusMessage: 'Wallet not found'
    };

    return next(response);
  }
  try {
    const response = await walletService.fetchTransaction(req.params);
    res.statusMessage = 'The transactions have been successfully fetched for the wallet';

    return res.status(200).json(response);
  } catch (error) {
    logger.error('The exception ', error.message);
    error.statusCode = 500;
    next(error);
  }
});

module.exports = router;
