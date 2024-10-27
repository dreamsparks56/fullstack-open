import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    setToken(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  },
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blogToLike) => {
  return async dispatch => {
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    await blogService.update(blogToLike.id, likedBlog)
    dispatch(updateBlog(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer