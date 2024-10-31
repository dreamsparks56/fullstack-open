import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { sortByLikes } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogSection = ({ verifyId }) => {
  const dispatch = useDispatch()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })
  const handleLikes = () => {
    dispatch(sortByLikes())
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

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