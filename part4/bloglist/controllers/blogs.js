const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username:1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }

  const user = await request.user

  const blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes,
    url: body.url,
    user: decodedToken.id
  })

  const savedBlog = await blog.save()
  if (savedBlog) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    await savedBlog.populate('user', { username:1, name: 1 })
    response.status(201).json(savedBlog)
  } else {
    response.status(400)
  }
})

blogsRouter.put('/:id',  async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const decodedId = decodedToken.id
  if (!decodedId) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }
  if (blog.userId.toString() !== decodedId.toString()) {
    return response.status(401).json({
      error: 'invalid user'
    })
  }
  const user = await request.user

  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(blog => blog !== request.params.id)
  await user.save()


  response.status(204).end()
})



module.exports = blogsRouter