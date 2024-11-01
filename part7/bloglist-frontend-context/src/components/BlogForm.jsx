import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const notify = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }

    newBlogMutation.mutate(newBlog)
    const msLength = 5000
    notify({ type: 'SET', payload: {
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      success: true
    }
    })

    setTimeout(() => { notify({ type: 'RESET' }) }, msLength)
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
