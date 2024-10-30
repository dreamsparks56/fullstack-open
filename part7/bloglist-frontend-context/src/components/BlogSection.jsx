import { useDispatch, useSelector } from 'react-redux'
import { sortByLikes } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogSection = ({ verifyId }) => {
  const dispatch = useDispatch()

  const handleLikes = () => {
    dispatch(sortByLikes())
  }

  const blogs = useSelector(state => state.blogs)
  return(
    <div>
      <h2>blogs</h2>
      <button onClick={handleLikes}>sort by likes</button>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          verifyId={verifyId}
        />
      ))}
    </div>
  )
}

export default BlogSection