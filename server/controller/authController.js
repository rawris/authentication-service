const logger = require('../logger');
const Password = require('../util/password');
const Database = require('../database/database');
const Jwt = require('../util/jwt');
const ResponseFormatter = require('../util/reponseFormatter');
const {
  generateToken,
} = require('../util/helperFunctions');
const {
  sendPasswordLink,
  passwordChangedConfirmation,
} = require('../util/mailer');

const SignUp = async (req, res) => {
  const {
    userData,
  } = req.body;
  // Hashing the password;
  try {
    const password = await Password.generateHashPassword(userData.password);
    userData.password = password;
    // Saving data in the database
    const dataForToken = await Database.addUpdate(userData);

    // Generate JWT Token.
    const jwtToken = await Jwt.sign(dataForToken);
    logger.log('Sign Up API Called', userData.email);
    // Send the jwttoken to the client.
    ResponseFormatter.formatResponse(res, {
      token: jwtToken,
      email: dataForToken.email,
    });
  } catch (error) {
    logger.error('Sign Up API failed', userData.email);
    ResponseFormatter.formatError(res, error);
  }
};

const SignIn = async (req, res) => {
  const {
    userData,
  } = req.body;
  try {
    // Find DB query for user
    const userDbData = await Database.findUser(userData.email);
    // Compare the password in request with the hashed Password.
    const checkPassword = await Password.comparePasswords(userDbData.password, userData.password);
    if (checkPassword) {
      // Sign jwt token with userDbData or whatever data you want to put here
      const jwtToken = await Jwt.sign(userDbData);
      if (jwtToken) {
        logger.log('Sign In API Called', userData.email);
        // Send Response to the client.
        ResponseFormatter.formatResponse(res, {
          email: userData.email,
          token: jwtToken,
        });
      }
    }
  } catch (error) {
    logger.error('Sign In API failed', userData.email);
    ResponseFormatter.formatError(res, error);
  }
};

const VerifyToken = async (req, res) => {
  const {
    token,
  } = req.body;
  try {
    // Verify token here
    await Jwt.verify(token);
    // Can write Custom logic for decoded value validation here.

    // end
    logger.log('Token Verification API called');
    ResponseFormatter.formatResponse(res, { isTokenValid: true });
  } catch (error) {
    logger.error('Token Verification API failed');
    ResponseFormatter.formatResponse(res, { isTokenValid: false });
  }
};

/**
 * This function creates a unique token and saves it in the user collection with the token
 * expiry time we use this token to create a url for client. where user can change their password.
 * we will use this token to validate all the password change requests.
 */
const ResetPasswordLink = async (req, res) => {
  try {
    const {
      email,
    } = req.body;
    // generate a unique token
    const token = await generateToken();
    // Data for token validation.
    const tokenData = {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    };
    // Save the generated token and the current time in the User Collection or doc
    await Database.savePasswordResetToken(tokenData, email);
    // Email the password link to the user
    await sendPasswordLink(email, token);
    logger.log('Reset Password Link API called');
    ResponseFormatter.formatResponse(res, { message: 'Email Successfully Sent' });
  } catch (error) {
    logger.error('Reset Password Link API failed');
    ResponseFormatter.formatError(res, error);
  }
};

/**
 * This function is used to validate the token when the url is opened
 * on the browser.
 */
const ValidateResetPasswordToken = async (req, res) => {
  const {
    email,
    token,
  } = req.params;
  try {
    // Validate the reset Password token in db
    const result = await Database.validateResetPasswordToken(email, token);
    if (result.isValid) {
      logger.log('Validate Password API called');
      ResponseFormatter.formatResponse(res, { isValid: result.isValid });
    } else {
      logger.error('Validate password API failed');
      ResponseFormatter.formatError(res, new Error('Not a valid token'));
    }
  } catch (error) {
    logger.error('Validate password API failed');
    ResponseFormatter.formatError(res, error);
  }
};

const ResetPassword = async (req, res) => {
  const {
    email,
    token,
    password,
  } = req.body;
  try {
    // validate the reset password token
    const isValid = await Database.validateResetPasswordToken(email, token);
    if (isValid) {
      // hash the new password.
      const hashPassword = await Password.generateHashPassword(password);
      // update the password in DB.
      await Database.updatePassword(email, hashPassword);
      // send the password confirmation email to the user.
      await passwordChangedConfirmation(email);
      ResponseFormatter.formatResponse(res, { message: 'Confirmation Sent' });
    }
  } catch (error) {
    logger.error('Reset Password API failed');
    ResponseFormatter.formatError(res, error);
  }
};

module.exports = {
  SignUp,
  SignIn,
  VerifyToken,
  ResetPasswordLink,
  ValidateResetPasswordToken,
  ResetPassword,
};
