import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { useState } from 'react'
import { Button, Typography } from '@mui/material'

const BlogDetails = ({ blogInfo }) => {
  const [comment, setComment] = useState('')

  const queryClient = useQueryClient()

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

  const commentBlogMutation = useMutation({
    mutationFn: commentService.createNew,
    onSuccess: (newComment) => {
      const blog = queryClient.getQueryData(['blog'])
      queryClient.setQueryData(['blog'], { ...blog, comments: blog.comments.concat(newComment) })
    }
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

  const handleComment = (event) => {
    event.preventDefault()
    commentBlogMutation.mutate({
      content: comment,
      blogId: blog.id
    })
  }

  if(!blog) {
    return null
  }

  return (
    <div>
      <Typography variant="h2">{blog.title} {blog.author}</Typography>
      {blog.url}
      <br></br>
      {blog.likes} likes
      <Button onClick={handleLike}>like</Button>
      <br></br>
            Added by {blog.user.name}
      <Typography variant="h3">Comments</Typography>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <Button type="submit">add coment</Button>
      </form>
    </div>

  )
}

export default BlogDetails