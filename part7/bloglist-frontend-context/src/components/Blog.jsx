import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blog = ({ blog, verifyId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()
  const notify = useNotificationDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

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

  const toggler = (label) => <button onClick={toggleExpanded}>{label}</button>

  const likeBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.update(blog.id, blogObject),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
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


  const deleteButton = () => <button onClick={handleDelete}>remove</button>

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
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {verifyId(blog.user.id) && deleteButton()}
      {toggler('collapse')}
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      {!isExpanded && blogMain()}
      {isExpanded && blogExpanded()}
    </div>
  )
}

export default Blog
