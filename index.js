const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()
const {checkObejctForStructure} = require('./util.js')
const app = express()
const port = process.env.PORT
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

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS for von-luck.de
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// MIDDLEWARE
const transporterMiddleware = (req, res, next, middleware = false) => {
  return new Promise((resolve, reject) => {
    transporter.verify()
    .then(() => {
      const serverMessage = 'vonLuck Server is ready'
      console.log(serverMessage)
      return middleware ? resolve(res.status(200).send(serverMessage)) : resolve(true)
    })
    .catch((err) => {
      console.log(err);
      return middleware ? reject(res.status(400).send('Transporter Verification Error')) : reject(err)
    })
  })
}


// ROUTES
app.get('/', transporterMiddleware(req, res, next))

app.post('/send-email', (req, res, next) => {
  const bodyStructure = [
    {
      key: 'from',
      type: 'string',
    },
    {
      key: 'to',
      type: 'string',
    },
    {
      key: 'subject',
      type: 'string',
    },
    {
      key: 'text',
      type: 'string',
    },
  ]
  Promise.all([
    checkObejctForStructure(req.body, bodyStructure),
    transporterMiddleware(req, res, next, true),
  ])
  .then(() => {
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
    };
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
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send('Bad Request Transporter to E-Mail-Server Verification Error')
  })
})

app.get('*', function(req, res){
  const NotFound = Error("Sorry we couldn't find your route. Please reach out to adrian@von-luck.de.")
  res.status(404).send(NotFound);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
