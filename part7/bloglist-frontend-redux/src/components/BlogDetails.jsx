import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, getBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Card, Heading, HStack, VStack } from '@chakra-ui/react'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  useEffect(() => {
  if (blog.comments) {
    dispatch(getBlog(blog.id))
  }
}, [])

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
          <Card.Root colorPalette={'teal'} align={{ base: "center", lg: "flex-start" }} maxW="sm">
            <Card.Body>
              <VStack>
      <Heading>{blog.title} {blog.author}</Heading>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
      <Button variant="outline" onClick={handleLike}>like</Button>
            Added by {blog.user.name}
            </VStack>
            </Card.Body>
            </Card.Root>
      <Heading size="md">Comments</Heading>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.content}</li>
        )}
      </ul>
      <form onSubmit={handleComment}>
        <HStack>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={(event) => setComment(event.target.value)}
        />
        <Button type="submit">add coment</Button>
        </HStack>
      </form>
    </div>

  )
}

export default BlogDetails