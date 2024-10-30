import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const user = useSelector(state => state.user)
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
  }, [user])

  const verifyId = (id) => {
    return blogService.verifyId(id)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const dashboard = () => (
    <div>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogSection verifyId={verifyId}/>
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
