import { useEffect } from 'react'
import { useUserDispatch, useUserValue } from './UserContext'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import NavBar from './components/NavBar'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import commentService from './services/comments'
import UserSection from './components/UserSection'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'


const App = () => {
  const userDispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user) {
        blogService.setToken(user.token)
        commentService.setToken(user.token)
        userDispatch({ type: 'LOGIN', payload: user })
      }
    }
  }, [])

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false
  })

  const blogs = blogsResult.data
  const users = usersResult.data

  const userMatch = useMatch('/users/:id')
  const routeUser = userMatch ?
    users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const routeBlog = blogMatch ?
    blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const verifyId = (id) => {
    return blogService.verifyId(id)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  )

  return (
    <Container>
      <Notification />
      <NavBar />
      <Routes>
        <Route path="/users/:id" element={<User user={routeUser} />} />
        <Route path="/blogs/:id" element={<BlogDetails blogInfo={routeBlog} verifyId={verifyId} />} />
        <Route path='/users' element={ <UserSection /> }/>
        <Route path='/' element={ <BlogSection verifyId={verifyId}/> } />
        <Route path="/login" element={ !user ? loginForm() : <Navigate replace to="/" /> } />
      </Routes>
    </Container>
  )
}

export default App
