var q = require('q'),
    sendEmail = require('../email/sendEmail'),
    connection = require('../bd/connection');

function login(req, res) {
  var deffered = q.defer()
  connection.login(req.body.user, req.body.password).then(function (success) {
    if (success) {
      res.redirect('http://127.0.0.1:3000/#/');
      deffered.resolve(req.body.user)
    }

    res.writeHead(404, {'ContentType': 'text/html'});
    res.write('<h1>Error en los datos de usuario</h1>');
    res.end('<h3><a href="http://127.0.0.1:3000/#/login">Intente nuevamente</a></h3>');
    deffered.resolve('')
  })

  return deffered.promise;
}

function register(req, res) {
  var info = req.body;

  connection.register(info.user, info.password,
                      info.name, info.company,
                      info.number, info.fax,
                      info.phone, info.email,
                      info.description);

  res.end('<h1>Su solicitud fue enviada con exito</h1>');
}

function email(req, res) {
  sendEmail.sendEmail(req, res);
}


module.exports.login = login;
module.exports.register = register;
module.exports.email = email;
