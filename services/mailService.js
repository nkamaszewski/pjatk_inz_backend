const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

exports.createMailMessage = (mail) => ({
  ...mail,
  from: process.env.PROJECT_ADDRESS_MAIL,
});

exports.sendMail = (message, callback) => transport.sendMail(message, callback);
