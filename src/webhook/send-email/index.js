const nodemailer = require('nodemailer')

// TRANSPORTER CONFIGURATION
let transporterConfiguration = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASSWORD
    },
    dkim: {
       domainName: 'von-luck.de',
    }
    // tls: {
        // do not fail on invalid certs
        // rejectUnauthorized: false
    // }
};
let transporter = nodemailer.createTransport(transporterConfiguration)

// send email
function sendEmailHandler(req, res, next) {
  const {body: {from, to = 'info@von-luck.de', name, subject = 'No Subject', text = 'No Text'}} = req
  console.log('Server is ready to take our messages')
  const html = `
    <h1>Feedback von ${name}</h1>
    <p>E-Mail: ${from}
    <p>Subject: ${subject}</p>
    <p>Message: ${text}</p>
  `
  var message = {
    from: '"vonLuck Server" <server@von-luck.de>',
    to: 'info@von-luck.de',
    subject: 'Feedback: ' + subject + ' by ' + name,
    // text: 'Just some Feedback from the costumer',
    html,
  }


  transporter.sendMail(message)
    .then(() => {
      const succsessMessage = 'email was send'
      console.log(succsessMessage);
      res.send(succsessMessage)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Send Mail caused Server Error. Please reach out to adrian@von-luck.de.')
    })
}

module.exports = {sendEmailHandler, transporter}
