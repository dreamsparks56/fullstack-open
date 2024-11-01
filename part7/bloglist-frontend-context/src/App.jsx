import { useEffect, useRef } from 'react'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { useUserDispatch, useUserValue } from './UserContext'

const App = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log(user)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        blogService.setToken(user.token)
        userDispatch({ type: 'LOGIN', payload: user })
      }
    }
  }, [])

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
    userDispatch({ type: 'LOGOUT' })
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
