/**
 * Here, You can connect and define your Database and add your customized logic for every
 * DB query. you can use 'initDBConnection' function to form a DB connection and you can
 * call this function in root file (index.js)
 */


const initDBConnection = () => {
  console.log('CONNECTION LOGIC WILL GO HERE');
};

const findUser = (email) => new Promise((resolve) => {
  setTimeout(() => resolve({
    email,
    password: '$2b$10$XNP7QjGz8/e.ZZXbKWp2beK5qWyhr.R4F7F70niMSvFijphjrwQHC',
  }), 1000);
});
const addUpdate = (userData) => new Promise((resolve) => {
  setTimeout(() => resolve({
    email: userData.email,
  }), 1000);
});
const savePasswordResetToken = (tokenData, email) => new Promise((resolve) => {
  setTimeout(() => resolve({
    email,
  }), 1000);
});
const validateResetPasswordToken = (email, token) => new Promise(
  (resolve) => resolve({ isValid: true }),
);
const updatePassword = (email, password) => new Promise(
  (resolve) => resolve({ message: 'done' }),
);

module.exports = {
  findUser,
  addUpdate,
  initDBConnection,
  savePasswordResetToken,
  validateResetPasswordToken,
  updatePassword,
};
