var mysql = require('mysql'),
    q = require('q'),
    userConnection = {
      host     : 'localhost',
      user     : 'root',
      password : 'TalleresPossa2015?',
      database: 'TalleresPossa'
    };

function allUsers() {
  // Open the connection
     var connection = mysql.createConnection(userConnection),
         info,
         deffered = q.defer();

    connection.connect(function(err) {
      if (err) {
        throw err
      }
      console.log('conect to database, success.');
    });

    // Obtein the information
    connection.query('SELECT * FROM `usuarios` LIMIT 0 , 30', function(err, rows, fields) {
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



module.exports.allUsers = allUsers;
