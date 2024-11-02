const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (request, response, next) => {
  let extractedUser = jwt.verify(request.token, process.env.SECRET)

  const user = User.findById(extractedUser.id)

  if (!user) {
    return response.status(401).json({
      error: 'user not found'
    })
  }
  request.user = user
  next()
}

const blogExtractor = (request, response, next) => {
  const comment = request.body
  console.log(comment.blogId)
  const blog = Blog.findById(comment.blogId)

  if (!blog) {
    return response.status(401).json({
      error: 'blog not found'
    })
  }
  request.blog = blog
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  blogExtractor,
  errorHandler
}