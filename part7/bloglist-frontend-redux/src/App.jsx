import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect((user) => {
    user && dispatch(initializeBlogs())
  }, [])

  const verifyId = (id) => {
    return blogService.verifyId(id)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', false))
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
    dispatch(createBlog({ ...blogObject, userId: user._id }))
    dispatch(setNotification(
      `a new blog ${blogObject.title} by ${blogObject.author} added`,
      true,
    ))
  }

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      dispatch(setNotification(
        `${returnedBlog.title} by ${returnedBlog.author} was successfully updated`,
        true,
      ))
    })
  }

  const sortByLikes = () => {
    setBlogs(blogs.toSorted((a, b) => b.likes - a.likes))
  }

  const deleteBlog = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      blogService.deleteBlog(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
        dispatch(setNotification(`${title} by ${author} was successfully deleted`, true))
      })
    }
  }

  const dashboard = () => (
    <div>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogSection />
      {blogForm()}
    </div>
  )

  const BlogSection = () => {
    const blogs = useSelector(state => {
      return state.blogs
    })
    return(
      <div>
        <h2>blogs</h2>
        <button onClick={sortByLikes}>sort by likes</button>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            verifyId={verifyId}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <Notification />

      {!user && loginForm()}
      {user && dashboard()}
    </div>
  )
}

export default App
