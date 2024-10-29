import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(
      `a new blog ${newBlog.title} by ${newBlog.author} added`,
      true,
    ))
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
