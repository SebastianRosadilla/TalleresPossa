var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

function createToken(req) {
  var payload = {
    sub: req.body.user,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

function authenticated(tokenCod) {
  tokenCod = tokenCod.split("\"")[1];

  return (jwt.decode(tokenCod, config.TOKEN_SECRET).sub);
}

function timeValidation(tokenCod) {
  tokenCod = tokenCod.split("\"")[1];

  var payload = jwt.decode(tokenCod, config.TOKEN_SECRET);

  return (payload.exp > moment().unix())
}

module.exports.createToken = createToken;
module.exports.authenticated = authenticated;
module.exports.timeValidation = timeValidation;
