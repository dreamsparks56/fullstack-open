const dummy = (blogs) => {
  const logger = require('./logger')

  logger.info(`The blogs length is ${blogs.length}`)
  return 1
}

module.exports = {
  dummy
}