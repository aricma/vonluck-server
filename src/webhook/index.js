// ROUTES
const webhookRouter = require('express').Router()
const {deliveryHandler} = require('./delivery/index.js')
const {sendEmailHandler} = require('./send-email/index.js')
const {sendEmailMiddlewareRouter} = require('./send-email/middleware.js')
const {csvConverter} = require('./monkey-office/index.js')
// FILE UPLOAD
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// webhookRouter.get('/', (req, res, next) => res.send('/webhook is active and waiting for req to subroute ...'))
webhookRouter.use('/delivery', deliveryHandler)
webhookRouter.use('/send-email', sendEmailMiddlewareRouter, sendEmailHandler)
webhookRouter.use('/monkey-office', upload.single('cash-reports'), csvConverter)

module.exports = {webhookRouter}
