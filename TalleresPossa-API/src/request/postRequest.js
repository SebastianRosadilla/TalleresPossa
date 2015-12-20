var fs = require('fs'),
    q = require('q'),
    connection = require('../bd/connection');

function login(req, res) {
  connection.login(req.body.user, req.body.password).then(function (success) {
    if (success)
      res.end('<h1>SUCCESS</h1>');

    res.end('<h1>FAIL</h1>');
  })
}

function register(req, res) {
  var info = req.body;

  connection.register(info.user, info.password,
                      info.name, info.company,
                      info.number, info.fax,
                      info.phone, info.email,
                      info.description);

  res.end();
}

module.exports.login = login;
module.exports.register = register;
