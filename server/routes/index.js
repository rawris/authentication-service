const express = require('express');

const Auth = require('./auth');

const router = express.Router();

router.use('/auth', Auth);

module.exports = router;
