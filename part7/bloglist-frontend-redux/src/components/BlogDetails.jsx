import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(setNotification(
      `the blog ${blog.title} by ${blog.author} was successfully updated`,
      true,
    ))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog({
      content: comment,
      blogId: blog.id
    })
    )
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
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add coment</button>
      </form>
    </div>

  )
}

export default BlogDetails