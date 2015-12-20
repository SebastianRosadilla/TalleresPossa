var fs = require('fs'),
    q = require('q'),
    connection = require('../bd/connection');

function landing(req, res) {
  connection.allUsers().then(function (data) {
    var rows = data.rows,
        fields = data.fields;

    res.writeHead(200, {'ContentType': 'text/html'});

    for (var i = 0; i < rows.length; i++) {
      res.write(JSON.stringify(rows[i], null, ' '));
    }

    res.end();
  });
}

module.exports.landing = landing;
