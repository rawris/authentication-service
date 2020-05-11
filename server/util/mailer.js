const nodemailer = require('nodemailer');
const {
  RESET_PASSWORD_EMAIL_CONTENT,
  RESET_PASSWORD_EMAIL_SUBJECT,
  RESET_PASSWORD_CONFIRMATION_EMAIL,
  RESET_PASSWORD_CONFIRMATION_SUBJECT,
} = require('../constant/appConstant');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendPasswordLink = (email, token) => new Promise((resolve, reject) => {
  transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: RESET_PASSWORD_EMAIL_SUBJECT, // Subject line
    text: RESET_PASSWORD_EMAIL_CONTENT(token),
  }, (error) => {
    if (error) {
      return reject(error);
    } return resolve({ success: true });
  });
});

const passwordChangedConfirmation = (email) => new Promise((resolve, reject) => {
  transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: RESET_PASSWORD_CONFIRMATION_SUBJECT, // Subject line
    text: RESET_PASSWORD_CONFIRMATION_EMAIL(email),
  }, (error) => {
    if (error) {
      return reject(error);
    } return resolve({ success: true });
  });
});

module.exports = {
  sendPasswordLink,
  passwordChangedConfirmation,
};
