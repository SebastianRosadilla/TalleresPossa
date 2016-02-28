var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),

    postRequest = require('./request/postRequest'),
    port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function allow (res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
}

// Server port
app.listen(port, function() {
  console.log('Server listen on port: ' + port + '.');
});

app.post('/email', function (req, res) {
  // Allow access the Ui to API data
  allow(res);
  
  postRequest.email(req, res);
})
