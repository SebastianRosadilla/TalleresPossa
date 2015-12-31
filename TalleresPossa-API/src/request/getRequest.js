var users = require('../users/usersInformation'),
    token = require('../check/token.js');

function usersInfo(req, res, tokenCod) {
  var userLogged = token.authenticated(tokenCod);

  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // userLogged is define
  if (userLogged)
    // Admin user logged
    if (userLogged == 'FabianPossamai')
      users.usersInfo(req, res);
    else
      // When someone is logged
      if (userLogged != '')
        users.userInfo(req, res, userLogged)
      // When someone is not logged
      else
        res.end();
  else
    res.end();
}

module.exports.usersInfo = usersInfo;
