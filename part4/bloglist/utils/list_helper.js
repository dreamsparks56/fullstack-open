const { countBy, forEach } = require('lodash')

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

const mostLikes = (blogs) => {
  const authors = []
  const likes = []
  forEach(blogs, (value) => {
    const index = authors.indexOf(value.author)
    if (index === -1) {
      authors.push(value.author)
      likes.push(value.likes)
    } else {
      likes[index] += value.likes
    }
  })
  const maxLikes = likes.indexOf(Math.max(...likes))
  return { 'author': authors[maxLikes], 'likes': likes[maxLikes] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

