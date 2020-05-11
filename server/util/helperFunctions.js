const crypto = require('crypto');

const generateToken = () => new Promise((resolve, reject) => {
  crypto.randomBytes(20, (error, buffer) => {
    if (error) {
      return reject(error);
    }
    const token = buffer.toString('hex');
    return resolve(token);
  });
});

module.exports = {
  generateToken,
};
