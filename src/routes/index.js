const router = require('express')();

router.use('/health', require('./health-route'));
router.use('/wallet', require('./wallet-route'));

module.exports = router;
