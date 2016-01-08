[1mdiff --git a/TalleresPossa-API/package.json b/TalleresPossa-API/package.json[m
[1mindex 0b88f9c..3099ecf 100644[m
[1m--- a/TalleresPossa-API/package.json[m
[1m+++ b/TalleresPossa-API/package.json[m
[36m@@ -6,7 +6,7 @@[m
   "scripts": {[m
     "test": "echo \"Error: no test specified\" && exit 1",[m
     "start": "nodemon ./src/app.js",[m
[31m-    "debug": "node-inspector & nodemon --debug ./src/app.js"[m
[32m+[m[32m    "debug": "node-inspector & nodemon --debug-brk ./src/app.js"[m
   },[m
   "repository": {[m
     "type": "git",[m
[36m@@ -24,7 +24,6 @@[m
     "ejs": "^2.3.4",[m
     "express": "^4.13.3",[m
     "gulp": "^3.9.0",[m
[31m-    "node-localstorage": "^0.6.0",[m
     "nodemailer": "^1.10.0",[m
     "q": "^1.4.1"[m
   },[m
[36m@@ -35,6 +34,8 @@[m
     "gulp-load-plugins": "^1.1.0",[m
     "gulp-minify": "0.0.5",[m
     "gulp-sass": "^2.1.0",[m
[32m+[m[32m    "jwt-simple": "^0.4.0",[m
[32m+[m[32m    "moment": "^2.10.6",[m
     "mysql": "^2.10.0",[m
     "node-sass": "^3.4.1"[m
   }[m
[1mdiff --git a/TalleresPossa-API/src/app.js b/TalleresPossa-API/src/app.js[m
[1mindex 4a36e23..b3e2f98 100644[m
[1m--- a/TalleresPossa-API/src/app.js[m
[1m+++ b/TalleresPossa-API/src/app.js[m
[36m@@ -2,14 +2,13 @@[m [mvar express = require('express'),[m
     q = require('q'),[m
     app = express(),[m
     bodyParser = require('body-parser'),[m
[31m-    LocalStorage = require('node-localstorage').LocalStorage,[m
[31m-    localStorage = new LocalStorage('./scratch'),[m
 [m
     getRequest = require('./request/getRequest'),[m
     postRequest = require('./request/postRequest'),[m
     port = 8000;[m
 [m
 [m
[32m+[m
 app.use(bodyParser.json()); // support json encoded bodies[m
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies[m
 [m
[36m@@ -19,24 +18,60 @@[m [mapp.listen(port, function() {[m
 });[m
 [m
 app.get('/', function (req, res) {[m
[31m-  getRequest.usersInfo(req, res, localStorage.talleresPossaUser);[m
[32m+[m[32m  // Allow access the Ui to API data[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Credentials', true);[m
[32m+[m
[32m+[m[32m  // obtein the token[m
[32m+[m[32m  var token = '';[m
[32m+[m[32m  for (var i in req.query) {[m
[32m+[m[32m    token = token + req.query[i][m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  if (token != '')[m
[32m+[m[32m    getRequest.usersInfo(req, res, token);[m
[32m+[m[32m  else[m
[32m+[m[32m    res.end('fail')[m
 });[m
 [m
[31m-app.get('/signOut', function (req, res) {[m
[31m-  localStorage.talleresPossaUser = '';[m
[31m-  res.redirect('http://127.0.0.1:3000/#/')[m
[32m+[m[32mapp.post('/signOut', function (req, res) {[m
[32m+[m[32m  // Allow access the Ui to API data[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Credentials', true);[m
[32m+[m
[32m+[m[32m  postRequest.closeSession(req, res);[m
 });[m
 [m
 app.post('/login', function (req, res) {[m
[31m-  postRequest.login(req, res).then(function(user) {[m
[31m-    localStorage.talleresPossaUser = user[m
[31m-  })[m
[32m+[m[32m  // Allow access the Ui to API data[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Credentials', true);[m
[32m+[m
[32m+[m[32m  postRequest.login(req, res);[m
 })[m
 [m
 app.post('/register', function (req, res) {[m
[32m+[m[32m  // Allow access the Ui to API data[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Credentials', true);[m
[32m+[m
   postRequest.register(req, res);[m
 })[m
 [m
 app.post('/email', function (req, res) {[m
[32m+[m[32m  // Allow access the Ui to API data[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');[m
[32m+[m[32m  res.setHeader('Access-Control-Allow-Credentials', true);[m
[32m+[m
   postRequest.email(req, res);[m
 })[m
[1mdiff --git a/TalleresPossa-API/src/bd/connection.js b/TalleresPossa-API/src/bd/connection.js[m
[1mindex 98e87a3..bab1dea 100644[m
[1m--- a/TalleresPossa-API/src/bd/connection.js[m
[1m+++ b/TalleresPossa-API/src/bd/connection.js[m
[36m@@ -52,42 +52,86 @@[m [mfunction usersInfoDB(user) {[m
         fields: fields[m
       }[m
       deffered.resolve(info);[m
[32m+[m
[32m+[m[32m      // End the connection[m
[32m+[m[32m      connection.end();[m
   });[m
 [m
[31m-  // End the connection[m
[31m-  connection.end();[m
 [m
   // Return the data[m
   return deffered.promise;[m
 }[m
 [m
[32m+[m[32mfunction userExist(user) {[m
[32m+[m[32m  var deffered = q.defer(),[m
[32m+[m[32m      connection = mysql.createConnection(userConnection);[m
 [m
[31m-function login(user, password) {[m
[31m-  var connection = mysql.createConnection(userConnection),[m
[31m-      deffered = q.defer();[m
[32m+[m[32m  if (user) {[m
[32m+[m[32m      connection.connect(function(err) {[m
[32m+[m[32m        if (err) throw err[m
 [m
[31m-    connection.connect(function(err) {[m
[31m-      if (err) throw err[m
[32m+[m[32m        console.log('conect to database, success.');[m
[32m+[m[32m      });[m
 [m
[31m-      console.log('conect to database, success.');[m
[31m-    });[m
[31m-[m
[31m-  // Comparte the dates[m
[31m-  connection.query([m
[31m-      'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE  \'' + user + '\' AND  `Contrasena` LIKE  \'' + password + '\' LIMIT 0 , 30',[m
[31m-      function (err, rows, fields) {[m
[31m-        if (err)[m
[31m-          deffered.resolve(false);[m
[31m-        else[m
[31m-          if (rows.length === 1)[m
[31m-            deffered.resolve(true);[m
[31m-          else[m
[32m+[m[32m    // Comparte the dates[m
[32m+[m[32m    connection.query([m
[32m+[m[32m        'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE  \'' + user + '\' LIMIT 0 , 30',[m
[32m+[m[32m        function (err, rows) {[m
[32m+[m[32m          if (err)[m
             deffered.resolve(false);[m
[31m-      }[m
[31m-    );[m
[32m+[m[32m          else[m
[32m+[m[32m            if (rows.length === 1)[m
[32m+[m[32m              deffered.resolve(true);[m
[32m+[m[32m            else[m
[32m+[m[32m              deffered.resolve(false);[m
[32m+[m
[32m+[m[32m          // End the connection[m
[32m+[m[32m          connection.end();[m
[32m+[m[32m        }[m
[32m+[m[32m      );[m
[32m+[m[32m  } else[m
[32m+[m[32m    deffered.resolve(false)[m
 [m
[31m-    // End the connection[m
[31m-    connection.end();[m
[32m+[m[32m  return deffered.promise;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction login(user, password) {[m
[32m+[m[32m  var connection = mysql.createConnection(userConnection),[m
[32m+[m[32m      deffered = q.defer();[m
[32m+[m
[32m+[m[32m  userExist(user).then(function (result) {[m
[32m+[m[32m      if (result) {[m
[32m+[m[32m        connection.connect(function(err) {[m
[32m+[m[32m          if (err) throw err[m
[32m+[m
[32m+[m[32m          console.log('conect to database, success.');[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m      // Comparte the dates[m
[32m+[m[32m      connection.query([m
[32m+[m[32m          'SELECT * FROM  `usuarios` WHERE  `Usuario` LIKE  \'' + user + '\' AND  `Contrasena` LIKE  \'' + password + '\' LIMIT 0 , 30',[m
[32m+[m[32m          function (err, rows, fields) {[m
[32m+[m[32m            if (err)[m
[32m+[m[32m              deffered.resolve(false);[m
[32m+[m[32m            else[m
[32m+[m[32m              if (rows.length === 1)[m
[32m+[m[32m                deffered.resolve(true);[m
[32m+[m[32m              else[m
[32m+[m[32m                deffered.resolve(false);[m
[32m+[m
[32m+[m[32m            // Upgrate the login info on db[m
[32m+[m[32m            connection.query([m
[32m+[m[32m              'UPDATE  `TalleresPossa`.`usuarios` SET  `login` =  `1` WHERE  `Usuario` LIKE  \'' + user + '\'',[m
[32m+[m[32m              function () {[m
[32m+[m[32m                // End the connection[m
[32m+[m[32m                connection.end();[m
[32m+[m[32m              }[m
[32m+[m[32m            )[m
[32m+[m[32m          }[m
[32m+[m[32m        );[m
[32m+[m[32m      } else[m
[32m+[m[32m        deffered.resolve(false)[m
[32m+[m[32m    })[m
 [m
     // Return the result[m
     return deffered.promise;[m
[36m@@ -98,8 +142,6 @@[m [mfunction register(user, password, name, company, number, fax, phone, email, desc[m
       deffered = q.defer(),[m
       date = currentDate();[m
 [m
[31m-      console.log(date);[m
[31m-[m
     connection.connect(function(err) {[m
       if (err) throw err[m
 [m
[36m@@ -107,11 +149,11 @@[m [mfunction register(user, password, name, company, number, fax, phone, email, desc[m
     });[m
 [m
     connection.query('INSERT INTO `TalleresPossa`.`usuarios` '[m
[31m-                    +'(`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Sexo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`)'[m
[32m+[m[32m                    +'(`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`)'[m
                     +' VALUES (\'0\', \'' + user + '\', \'' + password + '\','[m
[31m-                    +'\'' + name + '\', \'' + company + '\', \'' + number + '\','[m
[32m+[m[32m                    +' \'' + name + '\', \'' + company + '\', \'' + number + '\','[m
                     +' \'' + fax + '\', \'' + phone + '\', \'' + email + '\','[m
[31m-                    +' \'' + 'M' + '\', \'' + description + '\', \'' + date + '\','[m
[32m+[m[32m                    +' \'' + description + '\', \'' + date + '\','[m
                     +' \'' + date + '\', NULL);', function(err) {[m
   if (err) throw err[m
 [m
[36m@@ -120,6 +162,37 @@[m [mfunction register(user, password, name, company, number, fax, phone, email, desc[m
   });[m
 }[m
 [m
[32m+[m[32mfunction closeSession(user) {[m
[32m+[m[32m  var connection = mysql.createConnection(userConnection),[m
[32m+[m[32m      deffered = q.defer();[m
[32m+[m
[32m+[m[32m    userExist(user).then(function(result) {[m
[32m+[m[32m      if (result) {[m
[32m+[m[32m        connection.connect(function(err) {[m
[32m+[m[32m          if (err) throw err[m
[32m+[m
[32m+[m[32m          console.log('conect to database, success.');[m
[32m+[m[32m        });[m
[32m+[m
[32m+[m[32m        // Update the login data[m
[32m+[m[32m        connection.query('UPDATE  `TalleresPossa`.`usuarios` SET  `login` =  `0` WHERE  `Usuario` LIKE  \'' + user + '\'',[m
[32m+[m[32m                          function(err) {[m
[32m+[m[32m                            if (err)[m
[32m+[m[32m                              deffered.resolve(false)[m
[32m+[m[32m                            else[m
[32m+[m[32m                              deffered.resolve(true)[m
[32m+[m[32m                            // End the connection[m
[32m+[m[32m                            connection.end();[m
[32m+[m[32m                          });[m
[32m+[m
[32m+[m[32m      } else[m
[32m+[m[32m          deffered.resolve(false)[m
[32m+[m[32m    })[m
[32m+[m[32m    // Return the result[m
[32m+[m[32m    return deffered.promise;[m
[32m+[m[32m}[m
[32m+[m
 module.exports.usersInfoDB = usersInfoDB;[m
 module.exports.login = login;[m
 module.exports.register = register;[m
[32m+[m[32mmodule.exports.closeSession = closeSession;[m
[1mdiff --git a/TalleresPossa-API/src/email/sendEmail.js b/TalleresPossa-API/src/email/sendEmail.js[m
[1mindex 3a5e6a8..ef5edf5 100644[m
[1m--- a/TalleresPossa-API/src/email/sendEmail.js[m
[1m+++ b/TalleresPossa-API/src/email/sendEmail.js[m
[36m@@ -1,13 +1,13 @@[m
 // https://github.com/andris9/Nodemailer[m
 [m
 var nodemailer = require ('nodemailer'),[m
[31m-    userEmail = 'sebafing@gmail.com',[m
[32m+[m[32m    userEmail = 'tallerespossa@gmail.com',[m
 // create reusable transporter object using SMTP transport[m
     transporter = nodemailer.createTransport({[m
     service: 'Gmail',[m
     auth: {[m
         user: userEmail,[m
[31m-        pass: 'Seba_program1995?'[m
[32m+[m[32m        pass: 'TalleresPossa2015?'[m
     }[m
 });[m
 [m
[36m@@ -15,7 +15,7 @@[m [mfunction sendEmail(req, res) {[m
   // setup e-mail data with unicode symbols[m
   var mailOptions = {[m
       from: req.body.name + ' ✔ <' + req.body.email + '>', // sender address[m
[31m-      to: userEmail, // list of receivers[m
[32m+[m[32m      to: [userEmail], // list of receivers[m
       subject: req.body.subject + ' ✔', // Subject line[m
       html: '<h2><u>' + req.body.subject + '</u>:</h2>'[m
             +'<h3><center>' + req.body.description + '</center></h3>'  // plaintext body[m
[36m@@ -31,11 +31,11 @@[m [mfunction sendEmail(req, res) {[m
   // send mail with defined transport object[m
   transporter.sendMail(mailOptions, function(error, info){[m
       if(error){[m
[31m-        res.send("<h1>ERROR AL ENVIAR LA INFORMACION</h1>");[m
[32m+[m[32m        res.end("ERROR AL ENVIAR LA INFORMACION");[m
         return console.log(error);[m
       }[m
[32m+[m[32m      res.end('success');[m
       console.log('Message sent: ' + info.response);[m
[31m-      res.redirect(301, 'http://127.0.0.1:3000/#/');[m
   });[m
 }[m
 [m
[1mdiff --git a/TalleresPossa-API/src/request/getRequest.js b/TalleresPossa-API/src/request/getRequest.js[m
[1mindex 274d4f3..dc9e625 100644[m
[1m--- a/TalleresPossa-API/src/request/getRequest.js[m
[1m+++ b/TalleresPossa-API/src/request/getRequest.js[m
[36m@@ -1,6 +1,9 @@[m
[31m-var users = require('../users/usersInformation');[m
[32m+[m[32mvar users = require('../users/usersInformation'),[m
[32m+[m[32m    token = require('../check/token.js');[m
[32m+[m
[32m+[m[32mfunction usersInfo(req, res, tokenCod) {[m
[32m+[m[32m  var userLogged = token.ensureAuthenticated(tokenCod);[m
 [m
[31m-function usersInfo(req, res, userLogged) {[m
   // Allow access the Ui to API data[m
   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');[m
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');[m
[1mdiff --git a/TalleresPossa-API/src/request/postRequest.js b/TalleresPossa-API/src/request/postRequest.js[m
[1mindex 6c4022e..1f1d64f 100644[m
[1m--- a/TalleresPossa-API/src/request/postRequest.js[m
[1m+++ b/TalleresPossa-API/src/request/postRequest.js[m
[36m@@ -1,38 +1,53 @@[m
 var q = require('q'),[m
     sendEmail = require('../email/sendEmail'),[m
[31m-    connection = require('../bd/connection');[m
[32m+[m[32m    connection = require('../bd/connection'),[m
[32m+[m[32m    validation = require('../check/validations.js'),[m
[32m+[m[32m    token = require('../check/token.js');[m
 [m
 function login(req, res) {[m
[31m-  var deffered = q.defer()[m
[31m-  connection.login(req.body.user, req.body.password).then(function (success) {[m
[31m-    if (success) {[m
[31m-      res.redirect('http://127.0.0.1:3000/#/');[m
[31m-      deffered.resolve(req.body.user)[m
[31m-    }[m
[31m-[m
[31m-    res.writeHead(404, {'ContentType': 'text/html'});[m
[31m-    res.write('<h1>Error en los datos de usuario</h1>');[m
[31m-    res.end('<h3><a href="http://127.0.0.1:3000/#/login">Intente nuevamente</a></h3>');[m
[31m-    deffered.resolve('')[m
[31m-  })[m
[31m-[m
[31m-  return deffered.promise;[m
[32m+[m[32m  if (validation.loginValidation(req)) {[m
[32m+[m[32m    connection.login(req.body.user, req.body.password).then(function (success) {[m
[32m+[m[32m      if (success)[m
[32m+[m[32m        res.end(JSON.stringify(token.createToken(req)));[m
[32m+[m
[32m+[m[32m      res.end('Data Warning');[m
[32m+[m[32m    })[m
[32m+[m[32m  } else[m
[32m+[m[32m    res.end('Data Wrong')[m
 }[m
 [m
 function register(req, res) {[m
[31m-  var info = req.body;[m
[31m-[m
[31m-  connection.register(info.user, info.password,[m
[31m-                      info.name, info.company,[m
[31m-                      info.number, info.fax,[m
[31m-                      info.phone, info.email,[m
[31m-                      info.description);[m
[31m-[m
[31m-  res.end('<h1>Su solicitud fue enviada con exito</h1>');[m
[32m+[m[32m  if (validation.registerValidation(req)) {[m
[32m+[m[32m    var info = req.body;[m
[32m+[m
[32m+[m[32m    connection.register(info.user, info.password,[m
[32m+[m[32m                        info.name, info.company,[m
[32m+[m[32m                        info.number, info.fax,[m
[32m+[m[32m                        info.phone, info.email,[m
[32m+[m[32m                        info.description);[m
[32m+[m
[32m+[m[32m    res.end('success')[m
[32m+[m[32m  } else[m
[32m+[m[32m    res.end('Data Wrong');[m
 }[m
 [m
 function email(req, res) {[m
[31m-  sendEmail.sendEmail(req, res);[m
[32m+[m[32m  setTimeout(function() {[m
[32m+[m[32m    console.log(req.body);[m
[32m+[m[32m  }, 5000)[m
[32m+[m[32m  if (validation.mailValidation(req))[m
[32m+[m[32m    sendEmail.sendEmail(req, res);[m
[32m+[m[32m  else[m
[32m+[m[32m    res.end('<h1>Error 404</h1>')[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mfunction closeSession(req, res) {[m
[32m+[m[32m  if (req.body.user)[m
[32m+[m[32m    connection.closeSession(req.body.user).then(function(res) {[m
[32m+[m[32m      res ? res.end('success') : res.end('fail')[m
[32m+[m[32m    })[m
[32m+[m[32m  else[m
[32m+[m[32m    res.end('fail')[m
 }[m
 [m
 [m
[1mdiff --git a/TalleresPossa-ui/src/app/js/controllers/landing.js b/TalleresPossa-ui/src/app/js/controllers/landing.js[m
[1mindex 8a74894..e2ecb4d 100644[m
[1m--- a/TalleresPossa-ui/src/app/js/controllers/landing.js[m
[1m+++ b/TalleresPossa-ui/src/app/js/controllers/landing.js[m
[36m@@ -1,10 +1,21 @@[m
 (function (ng) {[m
   'use strict';[m
 [m
[31m-  var LandingCtrl = function ($state, $scope, $location, $rootScope, Auth, $q) {[m
[32m+[m[32m  var LandingCtrl = function ($state, $location, $rootScope, Auth, $q, $http) {[m
[32m+[m[32m    // Reference to use scope[m
[32m+[m[32m    var $scope = this;[m
[32m+[m
     this._$state = $state;[m
[31m-    this._$scope = $scope;[m
[31m-    this.$q = $q;[m
[32m+[m[32m    this._$http = $http;[m
[32m+[m[32m    this.$Auth = Auth;[m
[32m+[m[32m    this.$q  = $q;[m
[32m+[m[32m    this.userInfo;[m
[32m+[m[32m    this.initialized = false;[m
[32m+[m
[32m+[m[32m    this.init().then(function(userInfo) {[m
[32m+[m[32m      $scope.userInfo = userInfo || '';[m
[32m+[m[32m      $scope.initialized  = true;[m
[32m+[m[32m    })[m
 [m
     //FIXME trouble whit jQuery[m
     if ($rootScope.notHome) {[m
[36m@@ -13,18 +24,48 @@[m
     }[m
   };[m
 [m
[32m+[m[32m  LandingCtrl.prototype.init = function() {[m
[32m+[m[32m    var $Auth = this.$Auth,[m
[32m+[m[32m        info  =this._info,[m
[32m+[m[32m        deffered = this.$q.defer();[m
[32m+[m
[32m+[m[32m    $Auth.allInfo()[m
[32m+[m[32m    .then(function(data) {[m
[32m+[m[32m      if (data != '')[m
[32m+[m[32m        deffered.resolve(data[0])[m
[32m+[m[32m      else[m
[32m+[m[32m        deffered.resolve(data)[m
[32m+[m[32m    })[m
[32m+[m
[32m+[m[32m    return deffered.promise;[m
[32m+[m[32m  }[m
[32m+[m
   LandingCtrl.prototype.logged = function() {[m
[31m-    // var $Auth = this.$Auth,[m
[31m-    //     deffered = this.$q.defer(),[m
[31m-    //     auth = false;[m
[31m-    //[m
[31m-    // $Auth.auth().then(function(data) {[m
[31m-    //   auth = data[m
[31m-    // })[m
[31m-    //[m
[31m-    // return[m
[32m+[m[32m    if (localStorage.TalleresPossaAuth != '')[m
[32m+[m[32m      return false[m
[32m+[m
[32m+[m[32m    return true[m
   }[m
 [m
[32m+[m[32m  LandingCtrl.prototype.closeSession = function() {[m
[32m+[m[32m    var $http = this.$http,[m
[32m+[m[32m        $scope = this,[m
[32m+[m[32m        $scope.user = '';[m
[32m+[m
[32m+[m[32m    $scope.userInfo.hasOwnProperty('Usuario') ? $scope.user = userInfo.Usuario : $scope.user = '';[m
[32m+[m
[32m+[m[32m    $http({[m
[32m+[m[32m      url: 'http://127.0.0.1:8000/signOut',[m
[32m+[m[32m      method: 'POST',[m
[32m+[m[32m      headers: {'Content-Type': 'application/x-www-form-urlencoded'},[m
[32m+[m[32m      data: $.param({[m
[32m+[m[32m       user: $scope.user[m
[32m+[m[32m      })[m
[32m+[m[32m    });[m
[32m+[m
[32m+[m[32m    localStorage.TalleresPossaAuth = '';[m
[32m+[m[32m}[m
[32m+[m
   ng.module('talleresPossa')[m
     .controller('LandingCtrl', LandingCtrl);[m
 })(angular);[m
[1mdiff --git a/TalleresPossa-ui/src/app/js/services/Auth.js b/TalleresPossa-ui/src/app/js/services/Auth.js[m
[1mindex ff6075a..c29498c 100644[m
[1m--- a/TalleresPossa-ui/src/app/js/services/Auth.js[m
[1m+++ b/TalleresPossa-ui/src/app/js/services/Auth.js[m
[36m@@ -7,7 +7,12 @@[m
       var info,[m
           deffered = $q.defer();[m
 [m
[31m-      $http.get('http://127.0.0.1:8000').success(function(data) {[m
[32m+[m[32m      $http({[m
[32m+[m[32m        url:'http://127.0.0.1:8000',[m
[32m+[m[32m        method: 'GET',[m
[32m+[m[32m        params: localStorage.TalleresPossaAuth[m
[32m+[m[32m      })[m
[32m+[m[32m      .success(function(data) {[m
         deffered.resolve(data);[m
       });[m
 [m
[1mdiff --git a/TalleresPossa-ui/src/app/scss/main.scss b/TalleresPossa-ui/src/app/scss/main.scss[m
[1mindex 8a00cf5..1f17edb 100644[m
[1m--- a/TalleresPossa-ui/src/app/scss/main.scss[m
[1m+++ b/TalleresPossa-ui/src/app/scss/main.scss[m
[36m@@ -23,10 +23,10 @@[m
     overflow-y: hidden;[m
 [m
     >div:first-child {[m
[31m-      >form:last-child {[m
[32m+[m[32m      >div:last-child {[m
         margin-top: 20px;[m
 [m
[31m-        button {[m
[32m+[m[32m        span {[m
           background: transparent;[m
           border: none;[m
 [m
[1mdiff --git a/TalleresPossa-ui/src/app/templates/landing.html b/TalleresPossa-ui/src/app/templates/landing.html[m
[1mindex aa8fd33..dbf46cc 100644[m
[1m--- a/TalleresPossa-ui/src/app/templates/landing.html[m
[1m+++ b/TalleresPossa-ui/src/app/templates/landing.html[m
[36m@@ -5,13 +5,13 @@[m
       <h3 class="text-primary">WELCOME</h3>[m
     </div>[m
 [m
[31m-    </form>[m
[31m-    <form method="get" action="http://127.0.0.1:8000/signOut"[m
[31m-          class="container col-xs-6[m
[32m+[m[32m    <div class="container col-xs-6[m
                  text-right vertical-align"[m
[31m-          ng-class={'hidden': landing.logged()}>[m
[31m-        <button type="submit">Cerrar Session</button>[m
[31m-    </form>[m
[32m+[m[32m          ng-click="landing.closeSession()"[m
[32m+[m[32m          ng-class="{'hidden': landing.logged()}">[m
[32m+[m[32m        {{landing.userInfo.Usuario}}[m
[32m+[m[32m        <span>(Cerrar Session)</span>[m
[32m+[m[32m    </div>[m
   </div>[m
   <hr class="bg-primary">[m
 [m
[1mdiff --git a/TalleresPossa-ui/src/home/js/controllers/home.js b/TalleresPossa-ui/src/home/js/controllers/home.js[m
[1mindex ccf2980..0b842d7 100644[m
[1m--- a/TalleresPossa-ui/src/home/js/controllers/home.js[m
[1m+++ b/TalleresPossa-ui/src/home/js/controllers/home.js[m
[36m@@ -1,9 +1,10 @@[m
 (function (ng) {[m
   'use strict';[m
 [m
[31m-  var HomeCtrl = function ($state, $scope, $location, $rootScope, Auth) {[m
[32m+[m[32m  var HomeCtrl = function ($state, $scope, $location, $rootScope, Auth, $http) {[m
     this._$state = $state;[m
     this._$scope = $scope;[m
[32m+[m[32m    this._$http = $http;[m
     this.$Auth = Auth;[m
     this._$location = $location;[m
     this.err = 'Talleres Possa S.A';[m
[36m@@ -173,8 +174,8 @@[m
 [m
     if (checkEmpty)[m
       // check the min length to required fields[m
[31m-      if (formElements.name.length >= 8 && formElements.email.length >= 13[m
[31m-          && formElements.subject.length >= 4 && formElements.description.length >= 50)[m
[32m+[m[32m      if (formElements.name.length > 8 && formElements.email.length > 13[m
[32m+[m[32m          && formElements.subject.length > 4 && formElements.description.length > 50)[m
           // // email validation[m
          if (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(formElements.email))[m
           //   // number validation[m
[36m@@ -220,9 +221,37 @@[m
   HomeCtrl.prototype.deleteAllForm = function() {[m
     var formElements = this.formElements;[m
     for (var i in formElements) {[m
[31m-      formElement[i] = '';[m
[32m+[m[32m      formElements[i] = '';[m
     }[m
   }[m
[32m+[m
[32m+[m[32m  HomeCtrl.prototype.send = function() {[m
[32m+[m[32m    var $http = this._$http,[m
[32m+[m[32m        $scope = this,[m
[32m+[m[32m        $location = this._$location,[m
[32m+[m[32m        formElements = this.formElements;[m
[32m+[m
[32m+[m[32m    $http({[m
[32m+[m[32m      url: 'http://127.0.0.1:8000/email',[m
[32m+[m[32m      method: 'POST',[m
[32m+[m[32m      headers: {'Content-Type': 'application/x-www-form-urlencoded'},[m
[32m+[m[32m      data: $.param({[m
[32m+[m[32m        name: formElements.name, company: formElements.company,[m
[32m+[m[32m        number: formElements.number, fax: formElements.fax,[m
[32m+[m[32m        phone: formElements.phone, email: formElements.email,[m
[32m+[m[32m        subject: formElements.subject, description: formElements.description[m
[32m+[m[32m      })[m
[32m+[m[32m    })[m
[32m+[m[32m    .success(function(res) {[m
[32m+[m[32m      if(res === 'ERROR AL ENVIAR LA INFORMACION')[m
[32m+[m[32m        alert('Problema al enviar tu solcitud, Por favor intenta nuevamente')[m
[32m+[m[32m      else[m
[32m+[m[32m        alert('Enviado correctamente')[m
[32m+[m[41m        [m
[32m+[m[32m      $scope.deleteAllForm();[m
[32m+[m[32m    });[m
[32m+[m[32m  }[m
[32m+[m
   ng.module('talleresPossa')[m
     .controller('HomeCtrl', HomeCtrl);[m
 })(angular);[m
[1mdiff --git a/TalleresPossa-ui/src/home/templates/home.html b/TalleresPossa-ui/src/home/templates/home.html[m
[1mindex 1810899..bc4a8ab 100644[m
[1m--- a/TalleresPossa-ui/src/home/templates/home.html[m
[1m+++ b/TalleresPossa-ui/src/home/templates/home.html[m
[36m@@ -223,7 +223,7 @@[m
 [m
   <!-- Contact us container -->[m
   <div class="container col-xs-12 section" id="contactPage">[m
[31m-    <form action="http://127.0.0.1:8000/email" class="form" method="post">[m
[32m+[m[32m    <form class="form">[m
       <div class="container col-xs-8">[m
         <!-- Title -->[m
         <div class="container col-xs-12">[m
[36m@@ -238,8 +238,7 @@[m
               <div class="input-group">[m
                 <label for="name" class="input-group-addon"><span class="glyphicon glyphicon-user"></span></label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="name" value="" id="name"[m
[31m-                       ng-model="home.formElements.name" placeholder="Nombre...">[m
[32m+[m[32m                       id="name" ng-model="home.formElements.name" placeholder="Nombre...">[m
               </div>[m
             </div>[m
             <!-- Company -->[m
[36m@@ -247,8 +246,7 @@[m
               <div class="input-group">[m
                 <label for="company" class="input-group-addon"><span class="glyphicon glyphicon-briefcase"></span></label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="company" value="" id="company"[m
[31m-                       ng-model="home.formElements.company" placeholder="Empresa...">[m
[32m+[m[32m                       id="company" ng-model="home.formElements.company" placeholder="Empresa...">[m
               </div>[m
             </div>[m
           </div>[m
[36m@@ -259,8 +257,7 @@[m
               <div class="input-group">[m
                 <label for="number" class="input-group-addon"><span class="glyphicon glyphicon-phone-alt"></span></label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="number" value="" id="number"[m
[31m-                       ng-model="home.formElements.number" placeholder="Telefono...">[m
[32m+[m[32m                       id="number" ng-model="home.formElements.number" placeholder="Telefono...">[m
               </div>[m
             </div>[m
             <!-- Fax -->[m
[36m@@ -268,8 +265,7 @@[m
               <div class="input-group">[m
                 <label for="fax" class="input-group-addon"><span class="glyphicon glyphicon-print"></span></label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="fax" value="" id="fax"[m
[31m-                       ng-model="home.formElements.fax" placeholder="Fax...">[m
[32m+[m[32m                       id="fax" ng-model="home.formElements.fax" placeholder="Fax...">[m
               </div>[m
             </div>[m
           </div>[m
[36m@@ -280,8 +276,7 @@[m
               <div class="input-group">[m
                 <label for="phone" class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="phone" value="" id="phone"[m
[31m-                       ng-model="home.formElements.phone" placeholder="Celular...">[m
[32m+[m[32m                       id="phone" ng-model="home.formElements.phone" placeholder="Celular...">[m
               </div>[m
             </div>[m
             <!-- Email -->[m
[36m@@ -289,8 +284,7 @@[m
               <div class="input-group">[m
                 <label for="email" class="input-group-addon">@</label>[m
                 <input class="form-control" type="text"[m
[31m-                       name="email" value="" id="email"[m
[31m-                       ng-model="home.formElements.email" placeholder="Correo electronico...">[m
[32m+[m[32m                       id="email" ng-model="home.formElements.email" placeholder="Correo electronico...">[m
               </div>[m
             </div>[m
           </div>[m
[36m@@ -300,8 +294,7 @@[m
             <div class=" container col-xs-12 input-group">[m
               <label for="subject" class="input-group-addon"><span class="glyphicon glyphicon-pencil"></span></label>[m
               <input class="form-control" type="text"[m
[31m-                     name="subject" value="" id="subject"[m
[31m-                     ng-model="home.formElements.subject" placeholder="Asunto...">[m
[32m+[m[32m                     id="subject" ng-model="home.formElements.subject" placeholder="Asunto...">[m
             </div>[m
           </div>[m
 [m
[36m@@ -321,10 +314,11 @@[m
             </div>[m
             <div class="container[m
                         col-xs-3 col-sm-2">[m
[31m-              <button type="submit" class="btn btn-primary"[m
[31m-                      ng-class="{'disable': !home.validation()}">[m
[32m+[m[32m              <div class="btn btn-primary"[m
[32m+[m[32m                   ng-class="{'disable': !home.validation()}"[m
[32m+[m[32m                   ng-click="home.send()">[m
                  <span>ENVIAR</span>[m
[31m-               </button>[m
[32m+[m[32m               </div>[m
             </div>[m
             <div class="container col-xs-6">[m
               <span>{{home.err}}</span>[m
[1mdiff --git a/TalleresPossa-ui/src/img/Fondo1.jpg b/TalleresPossa-ui/src/img/Fondo1.jpg[m
[1mindex 43c47e2..ceddd73 100644[m
Binary files a/TalleresPossa-ui/src/img/Fondo1.jpg and b/TalleresPossa-ui/src/img/Fondo1.jpg differ
[1mdiff --git a/TalleresPossa-ui/src/img/Fondo4.jpg b/TalleresPossa-ui/src/img/Fondo4.jpg[m
[1mindex faf5691..14b2762 100644[m
Binary files a/TalleresPossa-ui/src/img/Fondo4.jpg and b/TalleresPossa-ui/src/img/Fondo4.jpg differ
[1mdiff --git a/TalleresPossa-ui/src/login/js/controllers/login.js b/TalleresPossa-ui/src/login/js/controllers/login.js[m
[1mindex 7523afe..84d3c6b 100644[m
[1m--- a/TalleresPossa-ui/src/login/js/controllers/login.js[m
[1m+++ b/TalleresPossa-ui/src/login/js/controllers/login.js[m
[36m@@ -1,10 +1,11 @@[m
 (function (ng) {[m
   'use strict';[m
 [m
[31m-  var LoginCtrl = function ($state, $scope, $location, $rootScope) {[m
[32m+[m[32m  var LoginCtrl = function ($state, $scope, $rootScope, $http,$location) {[m
     this._$state = $state;[m
     this._$scope = $scope;[m
     this._$location = $location;[m
[32m+[m[32m    this._$http = $http;[m
     this.user = '';[m
     this.password = '';[m
     this.err = 'Talleres Possa S.A';[m
[36m@@ -14,7 +15,7 @@[m
     var $scope = this;[m
 [m
     // long field validation[m
[31m-    if ($scope.user.length > 7 && $scope.password.length > 7) [m
[32m+[m[32m    if ($scope.user.length > 7 && $scope.password.length > 7)[m
       // password validation[m
       if (/^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test($scope.password)) {[m
         $scope.err = 'Talleres Possa S.A';[m
[36m@@ -25,6 +26,37 @@[m
     return false;[m
   }[m
 [m
[32m+[m[32m  LoginCtrl.prototype.send = function() {[m
[32m+[m[32m    var $http = this._$http,[m
[32m+[m[32m        $location = this._$location,[m
[32m+[m[32m        $scope = this;[m
[32m+[m
[32m+[m[32m    $http({[m
[32m+[m[32m      url: 'http://127.0.0.1:8000/login',[m
[32m+[m[32m      method: 'POST',[m
[32m+[m[32m      headers: {'Content-Type': 'application/x-www-form-urlencoded'},[m
[32m+[m[32m      data: $.param({[m
[32m+[m[32m       user: $scope.user,[m
[32m+[m[32m       password: $scope.password[m
[32m+[m[32m      })[m
[32m+[m[32m    })[m
[32m+[m[32m    .success(function(res) {[m
[32m+[m[32m      if (res === 'Data Wrong')[m
[32m+[m[32m        $window.location.href = 'http://www.cual-es-mi-ip.net/geolocalizar-ip-mapa';[m
[32m+[m[32m      else if (res === 'Data Warning') {[m
[32m+[m[32m        alert('Usuario o Contraseña incorrectos');[m
[32m+[m[32m        localStorage.TalleresPossaAuth = '';[m
[32m+[m[32m        $scope.user = '';[m
[32m+[m[32m        $scope.password = ''[m
[32m+[m[32m      }[m
[32m+[m[32m      else {[m
[32m+[m[32m        alert('Operacion Exitosa');[m
[32m+[m[32m        $location.url('/');[m
[32m+[m[32m        localStorage.TalleresPossaAuth = res;[m
[32m+[m[32m      }[m
[32m+[m[32m    })[m
[32m+[m[32m  }[m
[32m+[m
   ng.module('talleresPossa')[m
     .controller('LoginCtrl', LoginCtrl);[m
 })(angular);[m
[1mdiff --git a/TalleresPossa-ui/src/login/templates/login.html b/TalleresPossa-ui/src/login/templates/login.html[m
[1mindex 5daa07b..6630848 100644[m
[1m--- a/TalleresPossa-ui/src/login/templates/login.html[m
[1m+++ b/TalleresPossa-ui/src/login/templates/login.html[m
[36m@@ -1,6 +1,6 @@[m
 <div class="login">[m
   <img src="img/Fondo4.jpg" alt="" width="100%" height="100%">[m
[31m-  <form class="container col-xs-6 col-xs-offset-3" action="http://127.0.0.1:8000/login" method="post">[m
[32m+[m[32m  <form class="container col-xs-6 col-xs-offset-3">[m
     <div class="container[m
                 col-xs-6 col-xs-offset-3[m
                 col-sm-4 col-sm-offset-4">[m
[36m@@ -19,8 +19,8 @@[m
                   col-sm-6 col-sm-offset-3">[m
         <label for="user" class="input-group-addon"><span class="glyphicon glyphicon-user"></span></label>[m
         <input ng-model="login.user" class="form-control"[m
[31m-               type="text" name="user" id="user"[m
[31m-               value="" placeholder="Usuario...">[m
[32m+[m[32m               type="text" id="user"[m
[32m+[m[32m               placeholder="Usuario...">[m
       </div>[m
     </div>[m
 [m
[36m@@ -36,8 +36,8 @@[m
                   col-sm-6 col-sm-offset-3">[m
         <label for="password" class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></label>[m
         <input ng-model="login.password" class="form-control"[m
[31m-               type="password" name="password" id="password"[m
[31m-               value="" placeholder="Contraseña...">[m
[32m+[m[32m               type="password" id="password"[m
[32m+[m[32m               placeholder="Contraseña...">[m
       </div>[m
     </div>[m
 [m
[36m@@ -50,10 +50,11 @@[m
            ui-sref="register">[m
         <span>REGISTRAR</span>[m
       </div>[m
[31m-      <button ng-class="{'disable': !login.validation()}" type="submit"[m
[31m-              class="container col-xs-4 btn">[m
[32m+[m[32m      <div ng-class="{'disable': !login.validation()}"[m
[32m+[m[32m           ng-click="login.send()"[m
[32m+[m[32m           class="container col-xs-4 btn">[m
         <span>INGRESAR</span>[m
[31m-      </button>[m
[32m+[m[32m      </div>[m
       <div class="container btn[m
                   col-xs-4"[m
            ui-sref="landing">[m
[1mdiff --git a/TalleresPossa-ui/src/register/js/controllers/register.js b/TalleresPossa-ui/src/register/js/controllers/register.js[m
[1mindex 117ebab..c396531 100644[m
[1m--- a/TalleresPossa-ui/src/register/js/controllers/register.js[m
[1m+++ b/TalleresPossa-ui/src/register/js/controllers/register.js[m
[36m@@ -1,9 +1,10 @@[m
 (function (ng) {[m
   'use strict';[m
 [m
[31m-  var RegCtrl = function ($state, $scope, $location, $rootScope) {[m
[32m+[m[32m  var RegCtrl = function ($state, $scope, $location, $rootScope, $http) {[m
     this._$state = $state;[m
     this._$scope = $scope;[m
[32m+[m[32m    this._$http = $http;[m
     this._$location = $location;[m
     this.err = 'Para habilitar el boton enviar, se deben llenar los campos correctamente'[m
               +' Fax y Empresa no son obligatorios.';[m
[36m@@ -31,7 +32,7 @@[m
       // lenght validation[m
       if (formElements.user.length > 7 && formElements.password.length > 7[m
           // abc@gmail.com has 13 letters[m
[31m-          && formElements.email.length > 12 && formElements.name.length > 7)[m
[32m+[m[32m          && formElements.email.length > 3 && formElements.name.length > 7)[m
           // password validation[m
           if (/^[a-zA-Z0-9]+(\W|_|-)+[a-zA-Z0-9]*/.test(formElements.password))[m
             // email validation[m
[36m@@ -51,7 +52,7 @@[m
           else[m
             $scope.err = 'La contrseña debe tener al menos 8 digitos y un caracter especial (este no puede estar en el inicio)'[m
       else[m
[31m-        $scope.err = 'Todos los campos son obligatorios menos el de fax y el de empresa'[m
[32m+[m[32m        $scope.err = 'Todos los campos son obligatorios menos el de fax y el de empresa, el usuario y la contrasena no pueden tener menos de 8 digitos'[m
     else[m
       $scope.err = 'Tallere Possa S.A';[m
     return false;[m
[36m@@ -63,6 +64,46 @@[m
       formElement[i] = '';[m
     }[m
   }[m
[32m+[m
[32m+[m[32m  RegCtrl.prototype.send = function() {[m
[32m+[m[32m    var formElements = this.formElements,[m
[32m+[m[32m        $http = this._$http,[m
[32m+[m[32m        $location = this._$location;[m
[32m+[m[32m    // Send the form info[m
[32m+[m[32m    $http({[m
[32m+[m[32m      url: 'http://127.0.0.1:8000/register',[m
[32m+[m[32m      method: 'POST',[m
[32m+[m[32m      headers: {'Content-Type': 'application/x-www-form-urlencoded'},[m
[32m+[m[32m      data: $.param({[m
[32m+[m[32m        user: formElements.user, password: formElements.password,[m
[32m+[m[32m        name: formElements.name, company: formElements.company,[m
[32m+[m[32m        number: formElements.number, fax: formElements.fax,[m
[32m+[m[32m        phone: formElements.phone, email: formElements.email,[m
[32m+[m[32m        description: formElements.description[m
[32m+[m[32m      })[m
[32m+[m[32m    })[m
[32m+[m[32m    .success(function(res) {[m
[32m+[m[32m      if (res === 'Data Wrong')[m
[32m+[m[32m        $window.location.href = 'http://www.cual-es-mi-ip.net/geolocalizar-ip-mapa';[m
[32m+[m[32m      else {[m
[32m+[m[32m        // Login user[m
[32m+[m[32m        $http({[m
[32m+[m[32m          url: 'http://127.0.0.1:8000/login',[m
[32m+[m[32m          method: 'POST',[m
[32m+[m[32m          headers: {'Content-Type': 'application/x-www-form-urlencoded'},[m
[32m+[m[32m          data: $.param({[m
[32m+[m[32m           user: formElements.user,[m
[32m+[m[32m           password: formElements.password[m
[32m+[m[32m          })[m
[32m+[m[32m        })[m
[32m+[m[32m        .success(function(res) {[m
[32m+[m[32m          alert('Operacion Exitosa');[m
[32m+[m[32m          $location.url('/');[m
[32m+[m[32m          localStorage.TalleresPossaAuth = res;[m
[32m+[m[32m        })[m
[32m+[m[32m      }[m
[32m+[m[32m    })[m
[32m+[m[32m  }[m
   ng.module('talleresPossa')[m
     .controller('RegCtrl', RegCtrl);[m
 })(angular);[m
[1mdiff --git a/TalleresPossa-ui/src/register/templates/register.html b/TalleresPossa-ui/src/register/templates/register.html[m
[1mindex 21c98c8..ac28cc6 100644[m
[1m--- a/TalleresPossa-ui/src/register/templates/register.html[m
[1m+++ b/TalleresPossa-ui/src/register/templates/register.html[m
[36m@@ -1,6 +1,6 @@[m
 <div class="register">[m
   <img src="img/Fondo4.jpg" alt="" width="100%" height="100%">[m
[31m-  <form class="container col-xs-8" action="http://127.0.0.1:8000/register" method="post">[m
[32m+[m[32m  <form class="container col-xs-8">[m
     <!-- Title -->[m
     <div class="container col-xs-12">[m
       <div>[m
[36m@@ -18,8 +18,7 @@[m
           <div class="input-group">[m
             <label for="user" class="input-group-addon"><span class="glyphicon glyphicon-user"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="user" value="" id="user"[m
[31m-                   ng-model="register.formElements.user" placeholder="User name...">[m
[32m+[m[32m                   id="user" ng-model="register.formElements.user" placeholder="User name...">[m
           </div>[m
         </div>[m
         <!-- User Password -->[m
[36m@@ -27,8 +26,7 @@[m
           <div class="input-group">[m
             <label for="password" class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></label>[m
             <input class="form-control" type="password"[m
[31m-                   name="password" value="" id="password"[m
[31m-                   ng-model="register.formElements.password" placeholder="Password...">[m
[32m+[m[32m                   id="password" ng-model="register.formElements.password" placeholder="Password...">[m
           </div>[m
         </div>[m
       </div>[m
[36m@@ -40,8 +38,7 @@[m
           <div class="input-group">[m
             <label for="name" class="input-group-addon"><span class="glyphicon glyphicon-user"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="name" value="" id="name"[m
[31m-                   ng-model="register.formElements.name" placeholder="Nombre...">[m
[32m+[m[32m                   id="name" ng-model="register.formElements.name" placeholder="Nombre...">[m
           </div>[m
         </div>[m
         <!-- Company -->[m
[36m@@ -49,8 +46,7 @@[m
           <div class="input-group">[m
             <label for="company" class="input-group-addon"><span class="glyphicon glyphicon-briefcase"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="company" value="" id="company"[m
[31m-                   ng-model="register.formElements.company" placeholder="Empresa...">[m
[32m+[m[32m                   id="company" ng-model="register.formElements.company" placeholder="Empresa...">[m
           </div>[m
         </div>[m
       </div>[m
[36m@@ -61,8 +57,7 @@[m
           <div class="input-group">[m
             <label for="number" class="input-group-addon"><span class="glyphicon glyphicon-phone-alt"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="number" value="" id="number"[m
[31m-                   ng-model="register.formElements.number" placeholder="Telefono...">[m
[32m+[m[32m                   id="number" ng-model="register.formElements.number" placeholder="Telefono...">[m
           </div>[m
         </div>[m
         <!-- Fax -->[m
[36m@@ -70,8 +65,7 @@[m
           <div class="input-group">[m
             <label for="fax" class="input-group-addon"><span class="glyphicon glyphicon-print"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="fax" value="" id="fax"[m
[31m-                   ng-model="register.formElements.fax" placeholder="Fax...">[m
[32m+[m[32m                   id="fax" ng-model="register.formElements.fax" placeholder="Fax...">[m
           </div>[m
         </div>[m
       </div>[m
[36m@@ -82,8 +76,7 @@[m
           <div class="input-group">[m
             <label for="phone" class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="phone" value="" id="phone"[m
[31m-                   ng-model="register.formElements.phone" placeholder="Celular...">[m
[32m+[m[32m                   id="phone" ng-model="register.formElements.phone" placeholder="Celular...">[m
           </div>[m
         </div>[m
         <!-- Email -->[m
[36m@@ -91,15 +84,14 @@[m
           <div class="input-group">[m
             <label for="email" class="input-group-addon"><span>@</span></label>[m
             <input class="form-control" type="text"[m
[31m-                   name="email" value="" id="email"[m
[31m-                   ng-model="register.formElements.email" placeholder="Correo electronico...">[m
[32m+[m[32m                   id="email" ng-model="register.formElements.email" placeholder="Correo electronico...">[m
           </div>[m
         </div>[m
       </div>[m
 [m
       <!-- Description -->[m
       <div class="container col-xs-12 description">[m
[31m-        <textarea class="form-control vresize" name="description"[m
[32m+[m[32m        <textarea class="form-control vresize"[m
                   ng-model="register.formElements.description" placeholder="Informacion Extra...">[m
         </textarea>[m
       </div>[m
[36m@@ -113,10 +105,11 @@[m
            ng-click="register.deleteAllForm()">[m
         <span>LIMPIAR</span>[m
       </div>[m
[31m-      <button type="submit" class="container col-xs-3 btn"[m
[31m-              ng-class="{'disable': !register.validation()}">[m
[32m+[m[32m      <div class="container col-xs-3 btn"[m
[32m+[m[32m           ng-class="{'disable': !register.validation()}"[m
[32m+[m[32m           ng-click="register.send()">[m
         <span>ENVIAR</span>[m
[31m-      </button>[m
[32m+[m[32m      </div>[m
       <div class="container col-xs-3 btn"[m
            ui-sref="home">[m
         <span>CONOCER</span>[m
