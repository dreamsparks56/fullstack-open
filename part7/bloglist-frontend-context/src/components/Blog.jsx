import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Blog = ({ blog, verifyId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const blogRoute = `/blogs/${blog.id}`

  const blogMain = () => (
    <div>
      <Link to={blogRoute}>{blog.title}</Link>
      {blog.author} {toggler('expand')}
    </div>
  )

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggler = (label) => <Button onClick={toggleExpanded}>{label}</Button>

  const likeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.update(blog.id, blogObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog))
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(keptBlog => keptBlog.id !== blog.id))
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


  const deleteButton = () => <Button onClick={handleDelete}>remove</Button>

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)

      const msLength = 5000
      notify({ type: 'SET', payload: {
        message: `${blog.title} by ${blog.author} was successfully deleted`,
        success: true
      }
      })
      setTimeout(() => { notify({ type: 'RESET' }) }, msLength)
    }
  }

  const blogExpanded = () => (
    <div>
      <div>
        <Link to={blogRoute}>{blog.title}</Link>
        {blog.author}
      </div>
      <div>{blog.url}</div>
      <div data-testid="likes">
        {blog.likes}
        <Button onClick={handleLike}>like</Button>
      </div>
      <div>{blog.user.name}</div>
      {verifyId(blog.user.id) && deleteButton()}
      {toggler('collapse')}
    </div>
  )

  return (
    <div className="blog">
      {!isExpanded && blogMain()}
      {isExpanded && blogExpanded()}
    </div>
  )
}

export default Blog
