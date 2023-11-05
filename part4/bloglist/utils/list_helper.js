const dummy = (blogs) => {
  const logger = require('./logger')

  logger.info(`The blogs length is ${blogs.length}`)
  return 1
}

const totalLikes = (blogs) =>
  blogs.map(blog => blog.likes).reduce((a, b) => a + b)

const favoriteBlog = (blogs) => {
  const blogLikes = blogs.map(blog => blog.likes)
  return blogs.filter(blog => blog.likes === Math.max(...blogLikes))[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}

