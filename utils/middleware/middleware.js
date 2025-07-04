const logger = require('../logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('_________________________________')

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorhandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.send(400).json({ error: error.message })
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorhandler
}