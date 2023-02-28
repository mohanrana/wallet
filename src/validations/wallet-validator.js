/* eslint-disable import/newline-after-import */
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const { check, validationResult, param } = require('express-validator');

const checkNumber = (value) => {
  if (value === 0 || value === '0') throw new Error('Amount can not be 0.');

  return true;
};

exports.createNewWallet = async (req) => {
  await check('name')
    .exists()
    .withMessage('Wallet name is required.')
    .notEmpty()
    .withMessage("Wallet name shouldn't be empty.")
    .isString()
    .withMessage('Wallet name should be a string.')
    .trim()
    .run(req);

  await check('balance')
    .exists()
    .withMessage('The balance is required.')
    .notEmpty()
    .withMessage('The balance should not be empty.')
    .isNumeric()
    .withMessage('The balance should be a number.')
    .isFloat({ min: 1, max: 10 })
    .withMessage('Opening balance should be 1-10.')
    .run(req);
  const errors = validationResult(req);
  logger.debug(`Validators failure ${errors}`);

  return errors;
};

exports.fetchWallet = async (req) => {
  await param('walletId')
    .exists()
    .withMessage('walletId is required')
    .isString()
    .withMessage('walletId shoud be a string.')
    .withMessage('Invalid walletId.')
    .run(req);
  const errors = validationResult(req);
  logger.debug(`Validators failure ${errors}`);

  return errors;
};

exports.createTransaction = async (req) => {
  await check('walletId')
    .exists()
    .withMessage('walletId is required')
    .isString()
    .withMessage('walletId shoud be a string.')
    .withMessage('Invalid walletId.')
    .run(req);
  await check('amount')
    .exists()
    .withMessage('amount is required.')
    .isNumeric()
    .withMessage('amount should be a number.')
    .trim()
    .custom((value) => checkNumber(value))
    .run(req);
  await check('description')
    .exists()
    .withMessage('The description is required.')
    .notEmpty()
    .withMessage('The description should not be empty.')
    .isLength({ max: 20 })
    .withMessage('description length should not be more than 20 character.')
    .optional()
    .run(req);
  const errors = validationResult(req);
  logger.debug(`Validators failure ${errors}`);

  return errors;
};
