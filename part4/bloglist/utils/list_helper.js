const { countBy } = require('lodash')

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

const mostBlogs = (blogs) => {
  const mostBlogs = countBy(blogs, 'author')
  const authors = Object.keys(mostBlogs)
  const blogsAmount = Object.values(mostBlogs)
  return { 'author': authors[authors.length-1], 'blogs': blogsAmount[blogsAmount.length-1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}

