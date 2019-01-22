const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
// const {homepage} = require('./homepage/index.js')
// const {api} = require('./api/index.js')
const {webhookRouter} = require('./webhook/index.js')

const port = process.env.PORT

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// CORS
app.use(function(req, res, next) {
  const allowedOrigins = ['http://localhost:3000', 'https://www.von-luck.de', 'https://beta.von-luck.de'];
  const origin = req.headers.origin
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //intercepts OPTIONS method
  if (req.method === 'OPTIONS') { res.send(200) } else { next() }
})

// ROUTES
app.get('/', (req,res,next) => res.status(200).send('vonLuck server is online'))

  // webhooks
  app.use('/webhook', webhookRouter)

  // api
  // app.use('/api', api)


//not found message
app.get('*', (req, res) => res.status(404).send(Error("Sorry we couldn't find your route. Please reach out to adrian@von-luck.de.")))

// server is listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
