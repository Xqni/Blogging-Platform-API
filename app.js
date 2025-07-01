const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware/middleware')
// define routes here
const postRouter = require('./controllers/posts')

const app = express()

logger.info('connnecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB', error.message)
  })


app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


// define apis here
app.use('/api/posts', postRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorhandler)

module.exports = app