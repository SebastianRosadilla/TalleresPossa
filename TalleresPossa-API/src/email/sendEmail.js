// https://github.com/andris9/Nodemailer

var nodemailer = require ('nodemailer'),
    userEmail = 'tallerespossa@gmail.com',
// create reusable transporter object using SMTP transport
    transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: userEmail,
        pass: 'TalleresPossa2015?'
    }
});

function sendEmail(req, res) {
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: req.body.name + ' ✔ <' + req.body.email + '>', // sender address
      to: [userEmail], // list of receivers
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
        res.end("ERROR AL ENVIAR LA INFORMACION");
        return console.log(error);
      }
      res.end('success');
      console.log('Message sent: ' + info.response);
  });
}

module.exports.sendEmail = sendEmail;
