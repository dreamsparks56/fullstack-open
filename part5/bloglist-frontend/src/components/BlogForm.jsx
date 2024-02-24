import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }

  return (
    <div className='formContainer'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>Title
          <input
            value={newBlogTitle}
            onChange={event => setNewBlogTitle(event.target.value)}
            placeholder='insert a title...'
          />
        </div>
        <div>Author
          <input
            value={newBlogAuthor}
            onChange={event => setNewBlogAuthor(event.target.value)}
            placeholder='insert the author...'
          />
        </div>
        <div>URL
          <input
            value={newBlogURL}
            onChange={event => setNewBlogURL(event.target.value)}
            placeholder='insert the URL...'
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default BlogForm