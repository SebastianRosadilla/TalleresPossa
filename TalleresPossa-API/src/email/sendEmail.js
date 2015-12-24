// https://github.com/andris9/Nodemailer

var nodemailer = require ('nodemailer'),
    userEmail = 'sebafing@gmail.com',
// create reusable transporter object using SMTP transport
    transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userEmail,
        pass: 'Seba_program1995?'
    }
});

function sendEmail(req, res) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: req.body.name + ' ✔ <' + req.body.email + '>', // sender address
      to: userEmail, // list of receivers
      subject: req.body.subject + ' ✔', // Subject line
      html: '<h2><u>' + req.body.subject + '</u>:</h2>'
            +'<h3><center>' + req.body.description + '</center></h3>'  // plaintext body
            + '<h4><br><br><br>'
            + 'Nombre: ' + req.body.name + '<br>'
            + 'Empresa: ' + req.body.company + '<br>'
            + 'Telefono: ' + req.body.number + '<br>'
            + 'Fax: ' + req.body.fax + '<br>'
            + 'Celular: ' + req.body.phone + '<br>'
            + 'Email: ' + req.body.email + '<br></h4>',
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        res.send("<h1>ERROR AL ENVIAR LA INFORMACION</h1>");
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.redirect(301, 'http://127.0.0.1:3000/#/');
  });
}

module.exports.sendEmail = sendEmail;
