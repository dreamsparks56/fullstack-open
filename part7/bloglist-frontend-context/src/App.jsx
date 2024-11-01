import { useEffect, useRef, useState } from 'react'
import { useUserDispatch, useUserValue } from './UserContext'
import { Route, Routes, useMatch } from 'react-router-dom'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import userService from './services/users'
import UserSection from './components/UserSection'
import User from './components/User'


const App = () => {
  const userDispatch = useUserDispatch()
  const [users, setUsers] = useState([])
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

  useEffect(() => {
    userService
      .getAll()
      .then(acquiredUsers => {
        setUsers(acquiredUsers)
      })
  }, [])

  const match = useMatch('/users/:id')
  const routeUser = match ?
    users.find(user => user.id === match.params.id)
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

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    userDispatch({ type: 'LOGOUT' })
  }

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
      <Routes>
        {console.log(users)}
        <Route path="/users/:id" element={<User user={routeUser} />} />
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
