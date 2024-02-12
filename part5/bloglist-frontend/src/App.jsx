import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    (user && getBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])  

  const getBlogs = () => {  
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const handleNotification = (message, success) => {
    const length = 5000

    setMessage(message)
    setSuccess(success)
      setTimeout(() => {
        setMessage(null)
      }, length)
  }  

  const handleLogin = async ({ username, password }) => {    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)

      setUser(user)
      getBlogs()
    } catch (exception) {
      handleNotification('Wrong credentials', false)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm handleLogin={handleLogin} />
      </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
      </Togglable>
  )

  const addBlog = (blogObject) => {  
    blogService
      .create({...blogObject, userId: user._id})
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleNotification(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`, true)
      })
  }

  const dashboard = () => (
    <div>
      <div>{user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      {blogSection()}
      {blogForm()}
    </div>
  )

  const blogSection = () => (
    <div>
      <h2>blogs</h2>      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>

      <Notification message={message} success={success} />

      {!user && loginForm()} 
      {user && dashboard()}
    </div>
  )
}

export default App