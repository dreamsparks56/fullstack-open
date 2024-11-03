import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByLikes } from '../reducers/blogReducer'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Button, Card, Heading, Table, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const BlogSection = ({ verifyId }) => {
  const dispatch = useDispatch()

  const handleLikes = () => {
    dispatch(sortByLikes())
  }

  const blogs = useSelector(state => state.blogs)
  const user= useSelector(state=> state.user)

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  if(!user) {
    return(
      <VStack>
        <div>In order to see blogs, please log in</div>
        <Button asChild><Link to='/login'>login</Link></Button>
      </VStack>
    )
  }

  return(
    <div>    
    <Heading>Blogs</Heading>
    <Button onClick={handleLikes}>sort by likes</Button>
    <Card.Root colorPalette={'pink'}>
      <Card.Body>
      <Table.Root>
  <Table.Body>
    {blogs.map((blog) => (
    <Table.Row key={blog.id}>
      <Table.Cell>
        <Blog
          blog={blog}
          verifyId={verifyId}
        />
      </Table.Cell>
      <Table.Cell>
        {blog.user.name}
      </Table.Cell>
      </Table.Row>
        
      ))}
  </Table.Body>
</Table.Root>
      </Card.Body>
      <Card.Footer>      
      {blogForm()}
      </Card.Footer>
    </Card.Root>
    </div>
  )
}

export default BlogSection