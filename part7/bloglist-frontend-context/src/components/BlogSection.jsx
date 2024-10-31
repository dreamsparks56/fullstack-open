import { useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogSection = ({ verifyId }) => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })
  const sortByLikes = () => {
    const blogs = queryClient.getQueryData(['blogs'])
    queryClient.setQueryData(['blogs'], blogs.toSorted((a, b) => b.likes - a.likes))
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return(
    <div>
      <h2>blogs</h2>
      <button onClick={sortByLikes}>sort by likes</button>
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