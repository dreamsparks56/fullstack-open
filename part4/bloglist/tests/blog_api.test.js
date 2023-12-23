const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let savedUser = ''
let auth = ''

beforeAll(async () => {
  await User.deleteMany({})

  const username = 'root'
  const password = 'sekret'

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username: username, passwordHash })

  savedUser = await user.save()


  const userForToken = {
    username: username,
    id: savedUser._id,
  }

  auth = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`
})

beforeEach(async () => {
  await Blog.deleteMany({})
    .set('Authorization', auth)

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({
      author: blog.author,
      title: blog.title,
      likes: blog.likes,
      url: blog.url,
      userId: savedUser._id
    })
    await blogObject.save()
  }
})

describe('blog retrieval', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', auth)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', auth)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the id property is defined', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', auth)
    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('blog insertion', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'New title',
      author: 'New Author',
      url: 'https://www.com/',
      likes: 4,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', auth)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const amountOfBlogs = await helper.blogsInDb()
    expect(amountOfBlogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('the likes property has default value', async () => {
    const newBlogWithoutLikes = {

      title: 'New title',
      author: 'New Author',
      url: 'https://www.com/',
      __v: 0
    }

    const addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', auth)
      .send(newBlogWithoutLikes)

    expect(addedBlog.body.likes).toStrictEqual(0)
  })

  test('no blogs with missing properties are being added to the database', async () => {
    const newBlogWithoutData = {
      author: 'New Author',
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', auth)
      .send(newBlogWithoutData)
      .expect(400)

    const amountOfBlogs = await helper.blogsInDb()
    expect(amountOfBlogs).toHaveLength(helper.initialBlogs.length)
  })

  test('a new blog is not added without the token being provided', async () => {
    const newBlog = {
      title: 'New title',
      author: 'New Author',
      url: 'https://www.com/',
      likes: 5,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Invalid Token')
      .send(newBlog)
      .expect(401)

    const amountOfBlogs = await helper.blogsInDb()
    expect(amountOfBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('blog update', () => {
  test('succeeds with valid data', async () => {
    const blogs = await helper.blogsInDb()
    const blogIds = blogs.map(blog => blog.id)
    const updatedId = blogIds[Math.floor(Math.random() * blogIds.length)]

    const newValues = {
      likes: 17
    }

    const updatedBlog = await api
      .put(`/api/blogs/${updatedId}`)
      .set('Authorization', auth)
      .send(newValues)
      .expect(200)

    expect(updatedBlog.body.likes).toStrictEqual(newValues.likes)
  })
})

describe('blog deletion', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', auth)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
