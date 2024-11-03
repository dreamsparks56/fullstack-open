import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'

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
    try {
      const userInfo = await loginService.login(credentials)
      blogService.setToken(userInfo.token)
      commentService.setToken(userInfo.token)
      await dispatch(setUser(userInfo))
    } catch (exception) {
      await dispatch(setNotification('Wrong credentials', false))
    }

  }
}

export default userSlice.reducer