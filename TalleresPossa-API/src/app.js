var express = require('express'),
    app = express(),

    getRequest = require('./request/getRequest'),
    port = 8000;

// Server port
app.listen(port, function() {
  console.log('Server listen on port: ' + port + '.');
});

app.get('/', function (req, res) {
  getRequest.usersInfo(req, res);
})
