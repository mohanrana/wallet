/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/newline-after-import */
const { Logger } = require('motifer');
const logger = Logger.getLogger(__filename);
const walletRepository = require('../repositories/wallet-repository');

const createWallet = async (payload) => {
  let response = await walletRepository.saveWallet(payload);
  response = response.toJSON();

  return {
    id: response._id,
    name: response.name,
    balance: response.balance,
    createdDate: response.createdAt
  };
};

const getWallet = async (params) => {
  logger.info("Inside wallet API's service layer.");
  const response = await walletRepository.getWallet(params);
  let resObj = {};
  if (response && response.length) {
    resObj = {
      id: response[0]._id,
      name: response[0].name,
      balance: response[0].balance,
      createdDate: response[0].createdAt
    };
  } else {
    throw new Error('WalletId not found.');
  }

  return resObj;
};

const createTransaction = async (payload) => {
  const wallet = await getWallet(payload.params);
  const params = {
    ...payload.body,
    ...payload.params,
    balance: wallet.balance + parseFloat(payload.body.amount)
  };
  await walletRepository.updateWallet(params);
  let response = await walletRepository.saveTransaction(params);
  response = response.toJSON();
  const responseObject = {
    id: response._id,
    walletId: response.walletId,
    amount: response.amount,
    balance: response.balance,
    description: response.description,
    createdDate: response.createdAt
  };

  return responseObject;
};

const convertJosnKeys = (jsonArr, keyMap) => {
  const results = jsonArr.map((obj) => {
    obj = obj.toJSON();
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[keyMap[key] || key] = obj[key];
    });

    return newObj;
  });

  return results;
};

const fetchTransaction = async (payload) => {
  const response = await walletRepository.fetchTransaction(payload);
  const keyMap = {
    _id: 'id'
  };
  const results = convertJosnKeys(response, keyMap);

  return results;
};

module.exports = {
  createWallet,
  getWallet,
  createTransaction,
  fetchTransaction
};
