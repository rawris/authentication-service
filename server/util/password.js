const bcrypt = require('bcrypt');

const comparePasswords = (password, passwordReceived) => new Promise((resolve, reject) => {
  bcrypt.compare(passwordReceived, password, (error, result) => {
    if (result) {
      return resolve(true);
    } return reject(error);
  });
});

const generateHashPassword = (password) => new Promise((resolve, reject) => {
  bcrypt.hash(password, 10, (error, hash) => {
    if (hash) {
      return resolve(hash);
    } return reject(error);
  });
});

module.exports = {
  comparePasswords,
  generateHashPassword,
};
