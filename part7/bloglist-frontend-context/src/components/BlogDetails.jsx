import { useMutation, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogDetails = ({ blogInfo }) => {
  const notify = useNotificationDispatch()
  const result = useQuery({
    queryKey: ['blog'],
    queryFn: () => blogService.getOne(blogInfo.id)
  })

  const blog = result.data

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
      <h2>Comments</h2>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
    </div>

  )
}

export default BlogDetails