import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, verifyId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogMain = () => (
    <div>
      {blog.title} {blog.author} {toggler('expand')}
    </div>
  )

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggler = (label) => <button onClick={toggleExpanded}>{label}</button>

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(setNotification(
      `the blog ${blog.title} by ${blog.author} was successfully updated`,
      true,
    ))
  }


  const deleteButton = () => <button onClick={handleDelete}>remove</button>

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`${blog.title} by ${blog.author} was successfully deleted`, true))
    }
  }

  const blogExpanded = () => (
    <div>
      <div>
        {blog.title} {blog.author}
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
