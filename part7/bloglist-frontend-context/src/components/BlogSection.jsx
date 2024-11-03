import { useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Box, Button, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'

const BlogSection = ({ verifyId }) => {
  const queryClient = useQueryClient()

  const blogFormRef = useRef()

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
    return <Box p={'1em'}>
      <Skeleton variant="rounded" animation="wave" />
    </Box>
  }

  if ( result.isError ) {
    return <Box p={'1em'}>
    No data available
    </Box>
  }

  const blogs = result.data


  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return(
    <div>
      <Typography variant='h2'>blogs</Typography>
      <Button onClick={sortByLikes}>sort by likes</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog
                    blog={blog}
                    verifyId={verifyId}
                  />
                </TableCell>
                <TableCell>
                  {blog.user.name}
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {blogForm()}
    </div>
  )
}

export default BlogSection