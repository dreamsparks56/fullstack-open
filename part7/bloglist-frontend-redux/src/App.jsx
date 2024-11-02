import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import NavBar from './components/NavBar'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import UserSection from './components/UserSection'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        dispatch(setUser(user))
        blogService.setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {
    user && window.localStorage.setItem('loggedUser', JSON.stringify(user))
    user && dispatch(initializeBlogs())
    user && dispatch(initializeUsers())
  }, [user])

  const userMatch = useMatch('/users/:id')
  const routeUser = userMatch ?
    users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const routeBlog = blogMatch ?
    blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const blogFormRef = useRef()

  const verifyId = (id) => {
    return blogService.verifyId(id)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const dashboard = () => (
    <div>
      <NavBar />
      <Routes>
        <Route path="/users/:id" element={<User user={routeUser} />} />
        <Route path='/users' element={ <UserSection /> }/>
        <Route path="/blogs/:id" element={<BlogDetails blog={routeBlog} verifyId={verifyId} />} />
        <Route path='/' element={ <BlogSection verifyId={verifyId}/> } />
      </Routes>
      {blogForm()}
    </div>
  )

  return (
    <div>
      <Notification />

      {!user && loginForm()}
      {user && dashboard()}
    </div>
  )
}

export default App
