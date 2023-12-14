const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the id property is defined', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

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
    .send(newBlogWithoutLikes)

  expect(addedBlog.body.likes).toStrictEqual(0)
})

test('no notes with missing properties are being added to the database', async () => {
  const newBlogWithoutData = {
    author: 'New Author',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutData)
    .expect(400)

  const amountOfBlogs = await helper.blogsInDb()
  expect(amountOfBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})

