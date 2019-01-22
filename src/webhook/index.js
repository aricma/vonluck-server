const webhookRouter = require('express').Router()
const {deliveryHandler} = require('./delivery/index.js')
const {sendEmailHandler} = require('./send-email/index.js')
const {sendEmailMiddlewareRouter} = require('./send-email/middleware.js')

// webhookRouter.get('/', (req, res, next) => res.send('/webhook is active and waiting for req to subroute ...'))
webhookRouter.use('/delivery', deliveryHandler)
webhookRouter.use('/send-email', sendEmailMiddlewareRouter, sendEmailHandler)

module.exports = {webhookRouter}
