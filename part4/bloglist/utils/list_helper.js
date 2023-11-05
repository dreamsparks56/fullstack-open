const dummy = (blogs) => {
  const logger = require('./logger')

  logger.info(`The blogs length is ${blogs.length}`)
  return 1
}

const totalLikes = (blogs) =>
  blogs.map(blog => blog.likes).reduce((a, b) => a + b)

module.exports = {
  dummy, totalLikes
}

