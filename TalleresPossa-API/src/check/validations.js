function loginValidation(req) {
  // User and password are define
  if (req.body.hasOwnProperty('user') && req.body.hasOwnProperty('password'))
    // User has more that 7 chars length
    if (req.body.user.length > 7)
        // Password has more that 7 chars and has a special chart
        if (req.body.password.length > 7 && /^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test(req.body.password))
          return true

  return false
}

function registerValidation(req) {
  // Are define the users params
  if (req.body.hasOwnProperty('user') && req.body.hasOwnProperty('password')
      && req.body.hasOwnProperty('name') && req.body.hasOwnProperty('company') &&
      req.body.hasOwnProperty('number') && req.body.hasOwnProperty('fax')
      && req.body.hasOwnProperty('phone') && req.body.hasOwnProperty('email'))
      // User, password and name length are grather that 7
      // email length grather that 13
      if (req.body.user.length > 7 && req.body.password.length > 7
      // abc@gmail.com has 13 letters
      && req.body.email.length > 13 && req.body.name.length > 7)
        // password validation
        if (/^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test(req.body.password))
          // email validation
          if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(req.body.email))
            // number validation
            if (/^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.number))
              // phone number
              if (/^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.phone))
                return true

  return false
}


function mailValidation(req) {
  if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('company')
      && req.body.hasOwnProperty('number') && req.body.hasOwnProperty('fax') &&
      req.body.hasOwnProperty('phone') && req.body.hasOwnProperty('email')
      && req.body.hasOwnProperty('subject') && req.body.hasOwnProperty('description')) {
        if (req.body.name.length > 7 && req.body.email.length > 13
            && req.body.subject.length > 4 && req.body.description.length > 50)
            // // email validation
           if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(req.body.email))
            //   // number validation
              if (req.body.number != '' && req.body.phone != '') {
                if (/^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.phone) && /^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.number))
                  return true
              } else
                // tel validation when phone is empty
                if (req.body.number != '') {
                  if (/^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.number))
                    return true
                } else
                  // phone validation when tel is empty
                  if (req.body.phone != '') {
                    if (/^\+?(\d{1,3})?[- .]?\d+$/.test(req.body.phone))
                      return true
                  } else
                      return true;
  }
  return false
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.mailValidation = mailValidation;
