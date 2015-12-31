var express = require('express'),
    q = require('q'),
    app = express(),
    bodyParser = require('body-parser'),

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
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // obtein the token
  var token = '';
  for (var i in req.query) {
    token = token + req.query[i]
  }

  if (token != '')
    getRequest.usersInfo(req, res, token);
  else
    res.end('fail')
});

app.post('/signOut', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  postRequest.closeSession(req, res);
});

app.post('/login', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  postRequest.login(req, res);
})

app.post('/register', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  postRequest.register(req, res);
})

app.post('/email', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  postRequest.email(req, res);
})

app.post('/userExist', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // check that the user is not undefine
  if (req.body.user)
    postRequest.userExist(req.body.user).then(function(result) {
      res.send(result)
    })
  else
    res.send('false')
})

app.post('/emailExist', function (req, res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // check that the user is not undefine
  if (req.body.email)
    postRequest.emailExist(req.body.email).then(function(result) {
      res.send(result)
    })
  else
    res.send('false')
})

app.post('/edit', function (req,res) {
  // Allow access the Ui to API data
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  
})
