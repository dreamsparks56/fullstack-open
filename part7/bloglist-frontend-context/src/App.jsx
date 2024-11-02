import { useEffect, useRef, useState } from 'react'
import { useUserDispatch, useUserValue } from './UserContext'
import { Route, Routes, useMatch } from 'react-router-dom'
import NavBar from './components/NavBar'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import userService from './services/users'
import UserSection from './components/UserSection'
import User from './components/User'
import BlogDetails from './components/BlogDetails'


const App = () => {
  const userDispatch = useUserDispatch()
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        blogService.setToken(user.token)
        userDispatch({ type: 'LOGIN', payload: user })
      }
    }
  }, [])

  useEffect(() => {
    userService
      .getAll()
      .then(acquiredUsers => {
        setUsers(acquiredUsers)
      })
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(acquiredBlogs => {
        setBlogs(acquiredBlogs)
      })
  }, [])

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
        <Route path="/blogs/:id" element={<BlogDetails blogInfo={routeBlog} verifyId={verifyId} />} />
        <Route path='/users' element={ <UserSection /> }/>
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
