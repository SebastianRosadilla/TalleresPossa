var bcrypt = require('bcrypt'),
    q = require('q')

function createHash (password) {
  var deffered = q.defer();

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err

          deffered.resolve(hash)
      });
  });

  return deffered.promise
}

function checkHash (password, hash) {
  var deffered = q.defer();

  bcrypt.compare(password, hash, function(err, res) {
    if (err) throw err

    deffered.resolve(res);
  });

  return deffered.promise
}

module.exports.createHash = createHash;
module.exports.checkHash = checkHash;
