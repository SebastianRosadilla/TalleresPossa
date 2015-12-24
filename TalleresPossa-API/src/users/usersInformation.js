var q = require('q'),
    connection = require('../bd/connection');

// Return the userLogin information
function usersInfo(req, res) {
  connection.usersInfoDB().then(function (data) {
    var rows = data.rows,
        fields = data.fields;

    res.write(JSON.stringify(rows, null, ' '));

    res.end();
  });
}

function userInfo(req, res, userLogged) {
  connection.usersInfoDB(userLogged).then(function (data) {
    var rows = data.rows,
        fields = data.fields;

    res.write(JSON.stringify(rows, null, ' '));

    res.end();
  });
}

module.exports.usersInfo = usersInfo;
module.exports.userInfo = userInfo;
