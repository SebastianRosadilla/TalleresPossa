var express = require('express'),
    q = require('q'),
    app = express(),
    bodyParser = require('body-parser'),
    LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch'),

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
  getRequest.usersInfo(req, res, localStorage.talleresPossaUser);
});

app.get('/signOut', function (req, res) {
  localStorage.talleresPossaUser = '';
  res.redirect('http://127.0.0.1:3000/#/')
});

app.post('/login', function (req, res) {
  postRequest.login(req, res).then(function(user) {
    localStorage.talleresPossaUser = user
  })
})

app.post('/register', function (req, res) {
  postRequest.register(req, res);
})

app.post('/email', function (req, res) {
  postRequest.email(req, res);
})
