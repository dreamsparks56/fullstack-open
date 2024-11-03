import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Provider } from './components/ui/provider'
import blogService from './services/blogs'
import commentService from './services/comments'
import NavBar from './components/NavBar'
import BlogSection from './components/BlogSection'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UserSection from './components/UserSection'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { Container } from '@chakra-ui/react'

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
        commentService.setToken(user.token)
      }
    }
  }, [])

  useEffect(() => {
    user && window.localStorage.setItem('loggedUser', JSON.stringify(user))
    user && dispatch(initializeBlogs())
  }, [user])

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
    <Togglable buttonLabel="Click to login">
      <LoginForm />
    </Togglable>
  )

  return (
    <Provider>
      <Container>
      <Notification />
      <NavBar />
      <Routes>
        <Route path="/users/:id" element={<User user={routeUser} />} />
        <Route path='/users' element={ <UserSection /> }/>
        <Route path="/blogs/:id" element={<BlogDetails blog={routeBlog} verifyId={verifyId} />} />
        <Route path='/' element={ <BlogSection verifyId={verifyId}/> } />
        <Route path="/login" element={ !user ? loginForm() : <Navigate replace to="/" /> } />
      </Routes>
      </Container>
    </Provider>
  )
}

export default App
