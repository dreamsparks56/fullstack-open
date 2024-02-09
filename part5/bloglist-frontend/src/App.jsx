import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

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

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  
  const handleURLChange = (event) => {
    setNewBlogURL(event.target.value)
  }

  const handleNotification = (message, success) => {
    const length = 5000

    setMessage(message)
    setSuccess(success)
      setTimeout(() => {
        setMessage(null)
      }, length)
  }  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
    } catch (exception) {
      handleNotification('Wrong credentials', false)
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

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>Title 
          <input 
            value={newBlogTitle}
            onChange={handleTitleChange}
            />
        </div>
        <div>Author 
          <input 
            value={newBlogAuthor}
            onChange={handleAuthorChange}
            />
        </div>  
        <div>URL 
          <input 
            value={newBlogURL}
            onChange={handleURLChange}
            />
        </div>
        <button type="submit">save</button>       
      </form>
    </div>
  )

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    }
  
    blogService
      .create(newBlog)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        handleNotification(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`, true)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
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