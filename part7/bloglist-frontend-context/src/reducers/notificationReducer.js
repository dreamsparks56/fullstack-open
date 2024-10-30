import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    sendNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { sendNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, success) => {
  return async dispatch => {
    const msLength = 5000
    const notification = {
      message,
      success
    }
    dispatch(sendNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, msLength)
  }
}

export default notificationSlice.reducer