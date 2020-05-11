const APP_CONSTANT = {
  JWT_HASH_ALGORITHM: 'RS256',
  RESET_PASSWORD_EMAIL_SUBJECT: 'Reset Password',
  RESET_PASSWORD_EMAIL_CONTENT: (token) => `You are receiving this because you (or someone else) have requested to reset the password of your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${process.env.CLIENT_DOMAIN_NAME}/resetPassword/${token}\n\nThis Link will expire in an hour. \nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  RESET_PASSWORD_CONFIRMATION_EMAIL: (email) => `This is a confirmation that the password for your account ${email} has just been changed.\n`,
  RESET_PASSWORD_CONFIRMATION_SUBJECT: 'Password Chanaged',
};

module.exports = APP_CONSTANT;
