import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link as ChakraLink, HStack, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

const Blog = ({ blog, verifyId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()

  const blogRoute = `/blogs/${blog.id}`

  const blogMain = () => (
    <HStack>
      <ChakraLink asChild>
      <Link to={blogRoute}>
      <Text fontSize={'md'} fontWeight={'medium'}>
        {blog.title}
        </Text>
        </Link>
      </ChakraLink>      
      {blog.author} {toggler('expand')}
    </HStack>
  )

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggler = (label) => <Button variant={'surface'} onClick={toggleExpanded}>{label}</Button>

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
    dispatch(setNotification(
      `the blog ${blog.title} by ${blog.author} was successfully updated`,
      true,
    ))
  }


  const deleteButton = () => <Button variant={'outline'} onClick={handleDelete}>remove</Button>

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`${blog.title} by ${blog.author} was successfully deleted`, true))
    }
  }

  const blogExpanded = () => (
    <div>
      <HStack>
        <ChakraLink asChild>
      <Link to={blogRoute}>
      <Text fontSize={'md'} fontWeight={'medium'}>
        {blog.title}
        </Text>
        </Link>
      </ChakraLink> 
        {blog.author}
      </HStack>
      <div>{blog.url}</div>
      <HStack data-testid="likes">
        {blog.likes}
        <Button onClick={handleLike}>like</Button>
      </HStack>
      <div>{blog.user.name}</div>
      <HStack>
      {verifyId(blog.user.id) && deleteButton()}
      {toggler('collapse')}
      </HStack>      
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
