import { useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogDetails = ({ blog }) => {
  const notify = useNotificationDispatch()

  const likeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.update(blog.id, blogObject),
    onSuccess: () => {
      blog.likes = blog.likes + 1
    },
  })

  const handleLike = (event) => {
    event.preventDefault()
    likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
    const msLength = 5000
    notify({ type: 'SET', payload: {
      message: `the blog ${blog.title} by ${blog.author} was successfully updated`,
      success: true
    }
    })
    setTimeout(() => { notify({ type: 'RESET' }) }, msLength)
  }

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      {blog.url}
      <br></br>
      {blog.likes} likes
      <button onClick={handleLike}>like</button>
      <br></br>
            Added by {blog.user.name}
    </div>

  )
}

export default BlogDetails