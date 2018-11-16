const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
const port = 3000
// let selfSignedConfig = {
    // host: 'host129.checkdomain.com',
    // port: 587,
    // secure: true, // upgrade later with STARTTLS
    // auth: {
        // user: 'info@von-luck.de',
        // pass: 'VonLuck2002'
    // },
    // tls: {
        do not fail on invalid certs
        // rejectUnauthorized: false
    // }
// };
// let transporter = nodemailer.createTransport(selfSignedConfig/*[, defaults]*/)
//

app.use((req,res,next) => {
  bodyParser.json()
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))

// app.get('/send-email', (req, res, next) => {
  // transporter.verify()
  // .then((res) => {
    // console.log('Server is ready to take our messages');
    // console.log(req.body);
    // res.send('email gesendet')
  // })
  // .catch((err) => {
    // console.log(err);
    // next()
  // })
// })

app.get('/ein-croissant-bitte', (req, res, next) => req.send('Croissant'))

app.get('*', function(req, res){
  res.send("Sorry we couldn't find your route", 404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
