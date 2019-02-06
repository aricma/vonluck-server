// express
const express = require('express')
const app = express()

// const {homepage} = require('./homepage/index.js')
// const {api} = require('./api/index.js')

// import routes
const {webhookRouter} = require('./webhook/index.js')

// port
require('dotenv').config()
const port = process.env.PORT

// BODY PARSER set up
const bodyParser = require('body-parser')
app.use(bodyParser.json({type: ['application/json', 'application/javascript']}))
app.use(bodyParser.text({type: ['text', 'text/csv']}))
app.use(bodyParser.urlencoded({ extended: true }))

// CORS to Allow sertain urls to send requests
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

// VIEW SETUP
const reactViewEngine = require('express-react-views')
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViewEngine.createEngine({
  beautify: true,
  babel: {
    presets: ['@babel/preset-react', [ '@babel/preset-env', {'targets': {'node': 'current'}}]],
    plugins: ["babel-plugin-styled-components"]
  }
}));

// ROUTES
// const views = require('./routes')
app.get('/', (req,res,next) => res.status(200).render('index', { name: 'John' }))

  // webhooks
  app.use('/webhook', webhookRouter)

  // api
  // app.use('/api', api)


//not found message
app.get('*', (req, res) => res.status(404).send(Error("Sorry we couldn't find your route. Please reach out to adrian@von-luck.de.")))

// server is listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
