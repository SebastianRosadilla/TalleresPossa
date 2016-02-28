var sendEmail = require('../email/sendEmail'),
    validation = require('../check/validations.js');

function email(req, res) {
  if (validation.mailValidation(req)) {
    sendEmail.sendEmail(req, res);
  } else {
    res.end('<h1>Error 404</h1>');
  }
}

module.exports.email = email;
