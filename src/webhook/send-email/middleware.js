const sendEmailMiddlewareRouter = require('express').Router()
const {transporter} = require('./index.js')
const {checkObejctForStructure} = require('../../utils.js')

sendEmailMiddlewareRouter.use((req, res, next) => {
  transporter.verify()
  .then(() => {
    console.log('vonLuck Server is ready to send emails')
    res.status(200)
    next()
  })
  .catch((err) => {
    console.log(err);
    res.status(400).send('Transporter to email server verification error')
  })
})


sendEmailMiddlewareRouter.use((req, res, next) => {
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
  checkObejctForStructure(req.body, bodyStructure)
  .then(() => {
    console.log('/send-email is ready')
    res.status(200)
    next()
  })
  .catch((err) => {
    console.log(err)
    res.status(400).send('Bad Request for req.body structure')
  })
})

module.exports = {sendEmailMiddlewareRouter}
