/**
 * You can define any logger service you want here and use the already exposed functions
 * log, warn, error to define your third party logger functions.
 */

const log = (string) => {
  console.log(string);
};

const warn = (string) => {
  console.log(string);
};

const error = (string) => {
  console.log(string);
};

module.exports = {
  log,
  warn,
  error,
};
