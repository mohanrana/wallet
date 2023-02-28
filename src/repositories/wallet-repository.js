/* eslint-disable import/newline-after-import */
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const Wallet = require('../models/wallet-model');
const Transaction = require('../models/transaction-model');

exports.saveWallet = async (params) => {
  logger.info('The wallet payload ', params);
  const wallet = new Wallet(params);
  const result = await wallet.save();

  return result;
};

exports.getWallet = async (params) => {
  const fields = { __v: 0, updatedAt: 0 };
  const options = {};
  const condition = {
    _id: params.walletId
  };
  const result = await Wallet.find(condition, fields, options);

  return result;
};

exports.updateWallet = async (params) => {
  const query = {
    $inc: { balance: params.amount }
  };
  const condition = {
    _id: params.walletId
  };
  const result = await Wallet.updateOne(condition, query);

  return result;
};

exports.saveTransaction = async (params) => {
  logger.info('The transaction payload ', params);
  const wallet = new Transaction(params);
  const result = await wallet.save();

  return result;
};

exports.fetchTransaction = async (params) => {
  const fields = { __v: 0, updatedAt: 0 };
  const options = {};
  const condition = {
    walletId: params.walletId
  };
  const result = await Transaction.find(condition, fields, options);

  return result;
};
