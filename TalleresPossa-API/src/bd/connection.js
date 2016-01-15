var mysql = require('mysql'),
    encrypt = require('../check/encrypt'),
    q = require('q'),
    userConnection = {
      host     : '54.201.114.39',
      user     : 'root',
      password : 'TalleresPossa2015?',
      database: 'TalleresPossa'
    };

// mysql.escape used to safe to injetion attack

function currentDate() {
  var date = new Date(),
      day, month, year;

  date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();

  month = date.getMonth() + 1;
  month < 10 ? day = '0' + month : month;

  date = day + '/' + month + '/' + date.getFullYear();

  return date
}

function usersInfoDB(user) {
  var query = '';

  // When a ordinary user send a request
  if (user)
      query = 'SELECT * FROM `usuarios` WHERE `Usuario` = ' + mysql.escape(user) + ' LIMIT 0 , 30'
  // When admin send a request
  else
      query = 'SELECT * FROM `usuarios` LIMIT 0 , 30'
  // Open the connection
     var connection = mysql.createConnection(userConnection),
         info,
         deffered = q.defer();

    connection.connect(function(err) {
      if (err) throw err

      console.log('conect to database (Getting User Info), success.');
    });

    // Obtein the information
    connection.query(query, function(err, rows, fields) {
      if (err) {
        deffered.reject(err);
        throw err;
      }
      info = {
        rows: rows,
        fields: fields
      }
      deffered.resolve(info);

      // End the connection
      connection.end();
  });


  // Return the data
  return deffered.promise;
}

function emailExist(email) {
  var deffered = q.defer(),
      connection = mysql.createConnection(userConnection);

  if (email) {
      connection.connect(function(err) {
        if (err) throw err

        console.log('conect to database (Checking Email Exist), success.');
      });

    // Comparte the dates
    connection.query(
        'SELECT * FROM  `usuarios` WHERE  `Correo` LIKE ' + mysql.escape(email) + ' LIMIT 0 , 30',
        function (err, rows) {
          if (err)
            deffered.resolve(false);
          else
            if (rows.length === 1)
              deffered.resolve(true);
            else
              deffered.resolve(false);

          // End the connection
          connection.end();
        }
      );
  } else
    deffered.resolve(false)

  return deffered.promise;
}

function userExist(user) {
  var deffered = q.defer(),
      connection = mysql.createConnection(userConnection);

  if (user) {
      connection.connect(function(err) {
        if (err) throw err

        console.log('conect to database (Checking User Exist), success.');
      });

    // Comparte the dates
    connection.query(
        'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE ' + mysql.escape(user) + ' LIMIT 0 , 30',
        function (err, rows) {
          if (err)
            deffered.resolve(false);
          else
            if (rows.length === 1)
              deffered.resolve(true);
            else
              deffered.resolve(false);

          // End the connection
          connection.end();
        }
      );
  } else
    deffered.resolve(false)

  return deffered.promise;
}

function login(user, password) {
  var connection = mysql.createConnection(userConnection),
      deffered = q.defer();

  userExist(user).then(function (result) {
      if (result) {
        connection.connect(function(err) {
          if (err) throw err

          console.log('conect to database (Login), success.');
        });

      // Comparte the dates
      connection.query(
          'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE  ' + mysql.escape(user) + ' LIMIT 0 , 30',
          function (err, rows, fields) {
            if (err)
              deffered.resolve(false);
            else
              // Exist a user param on data store
              if (rows.length === 1)
                // check hash code
                encrypt.checkHash(password, rows[0].Contrasena)
                  .then(function(result) {
                    deffered.resolve(result);
                  })
              else
                deffered.resolve(false);

            // Upgrate the login info on db
            connection.query(
              'UPDATE  `TalleresPossa`.`usuarios` SET  `login` =  \'1\' WHERE  `Usuario` LIKE ' + mysql.escape(user),
              function (err) {
                if (err) throw err;
                // End the connection
                connection.end();
              }
            )
          }
        );
      } else
        deffered.resolve(false)
    })

    // Return the result
    return deffered.promise;
}

function register(user, password, name, company, number, fax, phone, email, description) {
  var connection = mysql.createConnection(userConnection),
      date = currentDate(),
      query = 'INSERT INTO `TalleresPossa`.`usuarios` '
                      +'(`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`)'
                      +' VALUES (\'0\',' + mysql.escape(user) + ', ' + mysql.escape(password) + ','
                      +' ' + mysql.escape(name) + ', ' + mysql.escape(company) + ', ' + mysql.escape(number) + ','
                      +' ' + mysql.escape(fax) + ', ' + mysql.escape(phone) + ', ' + mysql.escape(email) + ','
                      +' ' + mysql.escape(description) + ', \'' + date + '\','
                      +' \'' + date + '\', NULL);';


    if(user === 'FabianPossamai')
      // Just for the case when admin delete the account and register again
      query = 'INSERT INTO `TalleresPossa`.`usuarios` '
              +'(`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`)'
              +' VALUES (\'0\', ' + mysql.escape(user) + ', ' + mysql.escape(password) + ','
              +' ' + mysql.escape(name) + ', ' + mysql.escape(company) + ', ' + mysql.escape(number) + ','
              +' ' + mysql.escape(fax) + ', ' + mysql.escape(phone) + ', ' + mysql.escape(email) + ','
              +' ' + mysql.escape(description) + ', \'' + date + '\','
              +' \'' + date + '\', \'1\');'

    connection.connect(function(err) {
      if (err) throw err

      console.log('conect to database (Recording), success.');
    });

    connection.query(query, function(err) {
    if (err) throw err

    // End the connection
    connection.end();
    });
}

function deleteUser(user) {
  var connection = mysql.createConnection(userConnection),
      deffered = q.defer();

  userExist(user).then(function (result) {
      if (result) {
        connection.connect(function(err) {
          if (err) throw err;

          console.log('conect to database (Removing User), success.');
        });

      // Upgrate the login info on db
      connection.query(
        'DELETE FROM `TalleresPossa`.`usuarios`  WHERE  `Usuario` = ' + mysql.escape(user),
        function (err) {
          if (err) throw err
          // End the connection
          connection.end();
          deffered.resolve(true)
      })
    }
  })

  return deffered.promise;
}

function closeSession(user) {
  var connection = mysql.createConnection(userConnection),
      deffered = q.defer();

    userExist(user).then(function(result) {
      if (result) {
        connection.connect(function(err) {
          if (err) throw err

          console.log('conect to database (Closing Session), success.');
        });

        // Update the login data
        connection.query('UPDATE  `TalleresPossa`.`usuarios` SET  `login` =  \'0\' WHERE  `Usuario` LIKE ' + mysql.escape(user),
                          function(err) {
                            if (err)
                              deffered.resolve(false)
                            else
                              deffered.resolve(true)
                            // End the connection
                            connection.end();
                          });

      } else
          deffered.resolve(false)
    })
    // Return the result
    return deffered.promise;
}

function setOffLogin(user) {
  var connection = mysql.createConnection(userConnection);

  userExist(user).then(function (result) {
      if (result) {
        connection.connect(function(err) {
          if (err) throw err;

          console.log('conect to database (Login Off), success.');
        });

      // Upgrate the login info on db
      connection.query(
        'UPDATE  `TalleresPossa`.`usuarios` SET  `login` =  \'0\' WHERE  `Usuario` LIKE ' + mysql.escape(user),
        function (err) {
          if (err) throw err
          // End the connection
          connection.end();
      })
    }
  })
}

function editUser(user, password, name, company, number, fax, phone, email, description, lastUser) {
  var deffered = q.defer(),
     connection = mysql.createConnection(userConnection);

  // if lastUser exist
  userExist(lastUser).then(function(result) {
    if (result) {
      connection.connect(function(err) {
        if (err) throw err

        console.log('conect to database (Editing), success.');
      });

      connection.query('UPDATE  `TalleresPossa`.`usuarios` SET '
      + '`Usuario` = '+ mysql.escape(user) + ','
      + '`Contrasena` = ' + mysql.escape(password) + ','
      + '`Nombre` = ' + mysql.escape(name) + ','
      + '`Empresa` = ' + mysql.escape(company) + ','
      + '`Telefono` = ' + mysql.escape(number) + ','
      + '`Fax` = ' + mysql.escape(fax) + ','
      + '`Celular` = ' + mysql.escape(phone) + ','
      + '`Correo` = ' + mysql.escape(email) + ','
      + '`Info` = ' + mysql.escape(description) + ','
      + '`UltimaActualizacion` =  \'' + currentDate() + '\' '
      + 'WHERE  `Usuario` LIKE ' + mysql.escape(lastUser), function(err) {
        if (err) {
          deffered.resolve(false);
          throw err
        }

        deffered.resolve(true);
        // End the connection
        connection.end();
        });
    } else
      deffered.resolve(false)
  })

  return deffered.promise;
}

module.exports.usersInfoDB = usersInfoDB;
module.exports.login = login;
module.exports.register = register;
module.exports.closeSession = closeSession;
module.exports.userExist = userExist;
module.exports.emailExist = emailExist;
module.exports.setOffLogin = setOffLogin;
module.exports.deleteUser = deleteUser;
module.exports.editUser = editUser;
