function _exist(req, depen) {
  var has = true,
      request = req.body;

  for (var i = 0; i < depen.length; i++) {
    has = (has && request.hasOwnProperty(depen[i]));
  }

  return has;
}

function mailValidation(req) {
  var valid = false,
      depend = [
        'name', 'email',
        'subject', 'description'
      ];

  if (_exist(req, depend)) {
    if (req.body.name.length > 7 && req.body.email.length > 13
        && req.body.subject.length > 4 && req.body.description.length > 50) {
       // // email validation
       if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(req.body.email)) {
         valid = true;
       }
    }
  }

  return valid
}

module.exports.mailValidation = mailValidation;
