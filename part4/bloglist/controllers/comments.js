const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')

commentsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = await request.blog

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid'
    })
  }
  console.log(body)
  console.log(blog)

  const comment = new Comment({
    content: body.content,
    blog: blog.id
  })

  const savedComment = await comment.save()
  if (savedComment) {
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    await savedComment.populate('blog', { title: 1, author: 1 })
    response.status(201).json(savedComment)
  } else {
    response.status(400)
  }
})

module.exports = commentsRouter