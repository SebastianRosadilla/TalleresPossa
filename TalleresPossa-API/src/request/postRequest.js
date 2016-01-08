var q = require('q'),
    sendEmail = require('../email/sendEmail'),
    connection = require('../bd/connection'),
    validation = require('../check/validations.js'),
    token = require('../check/token.js');

function login(req, res) {
  if (validation.loginValidation(req)) {
    connection.login(req.body.user, req.body.password).then(function (success) {
      if (success) {
        res.end(JSON.stringify(token.createToken(req)));
        // If exist a last user logged
        if ((req.body.lastToken) && (req.body.lastToken != '')) {
          connection.setOffLogin(token.authenticated(req.body.lastToken));
        }
      }

      res.end('Data Warning');
    })
  } else
    res.end('Data Wrong')
}

function register(req, res) {
  if (validation.registerValidation(req)) {

    connection.register(req.body.user, req.body.password,
                        req.body.name, req.body.company,
                        req.body.number, req.body.fax,
                        req.body.phone, req.body.email,
                        req.body.description);

    res.end('success')
  } else
    res.end('Data Wrong');
}

function email(req, res) {
  if (validation.mailValidation(req))
    sendEmail.sendEmail(req, res);
  else
    res.end('<h1>Error 404</h1>')
}

function closeSession(req, res) {
  if (req.body.user)
    connection.closeSession(req.body.user).then(function(resp) {
      resp ? res.end('success') : res.end('fail')
    })
  else
    res.end('fail')
}

function userExist(user) {
  var deffered = q.defer();

  connection.userExist(user).then(function(result) {
    deffered.resolve(result)
  })

  return deffered.promise
}

function emailExist(email) {
  var deffered = q.defer();

  connection.emailExist(email).then(function(result) {
    deffered.resolve(result)
  })

  return deffered.promise
}

function userDelete(req, res) {
  if (req.body.user) {
    connection.deleteUser(req.body.user);
    res.end('success')
  }else
    res.end('fail')
}

function editUser(req, res) {
  var user = req.body.user;

  //admin cannot change userName
  if (req.body.lastUser === 'FabianPossamai')
    req.body.user = req.body.lastUser;
    
  // run the register test
  if (validation.registerValidation(req))
    connection.editUser(req.body.user, req.body.password,
                        req.body.name, req.body.company,
                        req.body.number, req.body.fax,
                        req.body.phone, req.body.email,
                        req.body.description, req.body.lastUser)
    .then(function(result) {
      if (result)
        res.end('success')
      else
        res.end('fail')
    })
  else
    res.end('fail')
}


module.exports.login = login;
module.exports.register = register;
module.exports.email = email;
module.exports.closeSession = closeSession;
module.exports.userExist = userExist;
module.exports.emailExist = emailExist;
module.exports.userDelete = userDelete;
module.exports.editUser = editUser;
