var q = require('q'),
    sendEmail = require('../email/sendEmail'),
    connection = require('../bd/connection'),
    validation = require('../check/validations.js'),
    token = require('../check/token.js');

function login(req, res) {
  if (validation.loginValidation(req)) {
    connection.login(req.body.user, req.body.password).then(function (success) {
      if (success)
        res.end(JSON.stringify(token.createToken(req)));

      res.end('Data Warning');
    })
  } else
    res.end('Data Wrong')
}

function register(req, res) {
  if (validation.registerValidation(req)) {
    var info = req.body;

    connection.register(info.user, info.password,
                        info.name, info.company,
                        info.number, info.fax,
                        info.phone, info.email,
                        info.description);

    res.end('success')
  } else
    res.end('Data Wrong');
}

function email(req, res) {
  setTimeout(function() {
    console.log(req.body);
  }, 5000)
  if (validation.mailValidation(req))
    sendEmail.sendEmail(req, res);
  else
    res.end('<h1>Error 404</h1>')
}

function closeSession(req, res) {
  if (req.body.user)
    connection.closeSession(req.body.user).then(function(res) {
      res ? res.end('success') : res.end('fail')
    })
  else
    res.end('fail')
}


module.exports.login = login;
module.exports.register = register;
module.exports.email = email;
