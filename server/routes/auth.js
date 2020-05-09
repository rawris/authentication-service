const express = require('express');
const {
  SignUp,
  SignIn,
  VerifyToken,
} = require('../controller');

const auth = express.Router();

auth.post('/signup', SignUp);

auth.post('/signin', SignIn);

auth.post('/verifyToken', VerifyToken);

module.exports = auth;
