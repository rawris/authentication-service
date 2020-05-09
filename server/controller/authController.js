const logger = require('../logger');
const Password = require('../util/password');
const Database = require('../database/database');
const Jwt = require('../util/jwt');
const ResponseFormatter = require('../util/reponseFormatter');

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
    const userDbData = await Database.findUser(userData.email);
    const checkPassword = await Password.comparePasswords(userDbData.password, userData.password);
    if (checkPassword) {
      const jwtToken = await Jwt.sign(userDbData);
      if (jwtToken) {
        logger.log('Sign In API Called', userData.email);
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


module.exports = {
  SignUp,
  SignIn,
  VerifyToken,
};
