const express = require('express');
const {
  SignUp,
  SignIn,
  VerifyToken,
  ResetPasswordLink,
  ValidateResetPasswordToken,
  ResetPassword,
} = require('../controller');

const auth = express.Router();

auth.post('/signup', SignUp);

auth.post('/signin', SignIn);

auth.post('/verifyToken', VerifyToken);

auth.post('/resetPasswordLink', ResetPasswordLink);

auth.get('/validateResetPasswordToken/:email/:token', ValidateResetPasswordToken);

auth.post('/changePassword', ResetPassword);

module.exports = auth;
