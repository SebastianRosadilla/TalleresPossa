var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

function createToken(req) {
  var payload = {
    sub: req.body.user,
    iat: moment().unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

function authenticated(tokenCod) {
  tokenCod = tokenCod.split("\"")[1];

  return (jwt.decode(tokenCod, config.TOKEN_SECRET).sub);
}

module.exports.createToken = createToken;
module.exports.authenticated = authenticated;
