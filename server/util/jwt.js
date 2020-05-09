const jwt = require('jsonwebtoken');

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded) {
        return resolve(decoded);
      } return reject(err);
    });
  });
};

const sign = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_KEY, (err, token) => {
      if (token) {
        return resolve(token);
      } return reject(err);
    });
  });
};

module.exports = {
  sign,
  verify,
};
