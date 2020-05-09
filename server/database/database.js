const initDBConnection = () => {
  console.log('CONNECTION LOGIC WILL GO HERE');
};

const findUser = (email) => {
  // Mockup function
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      email,
      password: '$2b$10$XNP7QjGz8/e.ZZXbKWp2beK5qWyhr.R4F7F70niMSvFijphjrwQHC',
    }), 1000);
  });
};

const addUpdate = (userData) => {
  // Mockup function
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      email: userData.email,
    }), 1000);
  });
};

module.exports = {
  findUser,
  addUpdate,
  initDBConnection,
};
