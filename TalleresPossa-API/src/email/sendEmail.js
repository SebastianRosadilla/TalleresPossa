function sendEmail(req, res) {
  var nodemailer = require('nodemailer'),
      sgTransport = require('nodemailer-sendgrid-transport'),
      userSendGrid = 'talleres_possa',
      passSendGrid = 'TalleresPossa_sendgrid2016?',
      emailUser = 'tallerespossa@gmail.com',
      options = {
        pool: true,
        // Simultaneous connections
        maxConnections: 10,
        // Limits the message count to be sent using a single connection
        maxMessages: 1,

        // How many milliseconds to wait for the connection to establish
        connectionTimeout: 5000,
        // How many milliseconds to wait for the greeting after connection is established
        greetingTimeout: 2000,
        // Limits the message count to be sent in a second
        rateLimit: 10,

        auth: {
          api_user: userSendGrid,
          api_key: passSendGrid
        }
      }

  var client = nodemailer.createTransport(sgTransport(options)),
      email = {
        from: req.body.email,
        to: emailUser,
        subject: req.body.subject,
        html: '<h2><u>' + req.body.subject + '</u>:</h2>'
            +'<h3><center>' + req.body.description + '</center></h3>'  // plaintext body
            + '<h4><br>'
            + 'Nombre: ' + req.body.name + '<br>'
            + 'Email: ' + req.body.email + '<br></h4>',
      };


  client.sendMail(email, function(err, info){
      if (err ){
        console.log(error);
        res.end("Fail to send message");
      }
      else {
        console.log('Message sent: ' + info.response);
        res.end("Success to send message");
      }
  });
}

module.exports.sendEmail = sendEmail;
