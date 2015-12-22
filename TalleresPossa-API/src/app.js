var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

    getRequest = require('./request/getRequest'),
    postRequest = require('./request/postRequest'),
    port = 8000;


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Server port
app.listen(port, function() {
  console.log('Server listen on port: ' + port + '.');
});

app.get('/', function (req, res) {
  getRequest.usersInfo(req, res);
})

app.post('/login', function (req, res) {
  postRequest.login(req, res);
})

app.post('/register', function (req, res) {
  postRequest.register(req, res);
})

app.post('/email', function (req, res) {
  postRequest.email(req, res);
})
