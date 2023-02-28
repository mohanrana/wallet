/* eslint-disable security/detect-non-literal-regexp */
const config = require('config').get('server');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const router = express.Router();

router.use((req, res, next) => {
  if (req.url.indexOf('iframe.html') === -1) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  }
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.setHeader('pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-XSS-Protection', '1;');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

router.use(helmet());
router.use(compression());
router.use(express.json({ limit: '5mb' }));
router.use(cors({
  origin:
      config.get('corsWhitelist').length === 0
        ? '*'
        : config.get('corsWhitelist').map((x) => new RegExp(x))
}));

module.exports = {
  router
};
