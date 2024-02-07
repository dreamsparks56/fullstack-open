import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    const getBlogs = () => {  
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
    <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </>     
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

      <Notification message={errorMessage} />

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name} logged in</p>
          {blogSection()}
        </div>
      }
    </div>
  )
}

export default App