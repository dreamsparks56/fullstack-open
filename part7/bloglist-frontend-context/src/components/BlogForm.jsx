import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const dispatch = useDispatch()
  const notify = useNotificationDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }

    dispatch(createBlog(newBlog))
    const msLength = 5000
    notify({ type: "SET", payload: {
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      success: true
    }
    })
    
    setTimeout(() => { notify({ type: "RESET" }) }, msLength)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }

  return (
    <div className="formContainer">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            data-testid="title"
            value={newBlogTitle}
            onChange={(event) => setNewBlogTitle(event.target.value)}
            placeholder="insert a title..."
          />
        </div>
        <div>
          Author
          <input
            data-testid="author"
            value={newBlogAuthor}
            onChange={(event) => setNewBlogAuthor(event.target.value)}
            placeholder="insert the author..."
          />
        </div>
        <div>
          URL
          <input
            data-testid="url"
            value={newBlogURL}
            onChange={(event) => setNewBlogURL(event.target.value)}
            placeholder="insert the URL..."
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default BlogForm
