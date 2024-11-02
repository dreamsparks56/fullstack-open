import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions

export const login = (credentials) => {
  return async dispatch => {
    const userInfo = await loginService.login(credentials)
    blogService.setToken(userInfo.token)
    commentService.setToken(userInfo.token)
    await dispatch(setUser(userInfo))
  }
}

export default userSlice.reducer