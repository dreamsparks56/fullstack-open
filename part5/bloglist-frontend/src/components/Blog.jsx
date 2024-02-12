import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog, verifyId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogMain = () => (
  <div>
    {blog.title} {blog.author} {toggler('expand')}
  </div> 
  )

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const toggler = (label) => (
    <button onClick = {toggleExpanded}>
      {label}
    </button>
  )

  const handleLike = (event) => {    
    event.preventDefault()

    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const deleteButton = () => (
    <button onClick={handleDelete}>remove</button>
  )

  const handleDelete = (event) => {    
    event.preventDefault()

    deleteBlog(blog.id, blog.title, blog.author)
  }


  const blogExpanded = () => (
    <div>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      {verifyId(blog.user.id) && deleteButton()}
      {toggler('collapse')}
    </div>
    )

  return (
    <div style = {blogStyle}>
    {!isExpanded && blogMain()}
    {isExpanded && blogExpanded()}
   </div>
 )
}

export default Blog