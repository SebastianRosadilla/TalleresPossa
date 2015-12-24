var mysql = require('mysql'),
    q = require('q'),
    userConnection = {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'TalleresPossa2015?',
      database: 'TalleresPossa'
    };

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
      query = 'SELECT * FROM `usuarios` WHERE `Usuario` = \'' + user + '\' LIMIT 0 , 30'
  // When admin send a request
  else
      query = 'SELECT * FROM `usuarios` LIMIT 0 , 30'
  // Open the connection
     var connection = mysql.createConnection(userConnection),
         info,
         deffered = q.defer();

    connection.connect(function(err) {
      if (err) throw err

      console.log('conect to database, success.');
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
  });

  // End the connection
  connection.end();

  // Return the data
  return deffered.promise;
}


function login(user, password) {
  var connection = mysql.createConnection(userConnection),
      deffered = q.defer();

    connection.connect(function(err) {
      if (err) throw err

      console.log('conect to database, success.');
    });

  // Comparte the dates
  connection.query(
      'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE  \'' + user + '\' AND  `Contrasena` LIKE  \'' + password + '\' LIMIT 0 , 30',
      function (err, rows, fields) {
        if (err)
          deffered.resolve(false);
        else
          if (rows.length === 1)
            deffered.resolve(true);
          else
            deffered.resolve(false);
      }
    );

    // End the connection
    connection.end();

    // Return the result
    return deffered.promise;
}

function register(user, password, name, company, number, fax, phone, email, description) {
  var connection = mysql.createConnection(userConnection),
      deffered = q.defer(),
      date = currentDate();

      console.log(date);

    connection.connect(function(err) {
      if (err) throw err

      console.log('conect to database, success.');
    });

    connection.query('INSERT INTO `TalleresPossa`.`usuarios` '
                    +'(`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Sexo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`)'
                    +' VALUES (\'0\', \'' + user + '\', \'' + password + '\','
                    +'\'' + name + '\', \'' + company + '\', \'' + number + '\','
                    +' \'' + fax + '\', \'' + phone + '\', \'' + email + '\','
                    +' \'' + 'M' + '\', \'' + description + '\', \'' + date + '\','
                    +' \'' + date + '\', NULL);', function(err) {
  if (err) throw err

  // End the connection
  connection.end();
  });
}

module.exports.usersInfoDB = usersInfoDB;
module.exports.login = login;
module.exports.register = register;
