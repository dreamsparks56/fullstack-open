import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
    await dispatch(setUser(userInfo))
  }
}

export default userSlice.reducer