import { createSlice } from "@reduxjs/toolkit";

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

export const setNotification = (message, length) => {
    return async dispatch => {
        const msLength = length * 1000

        dispatch(sendNotification(message))
        setTimeout(() => { 
            dispatch(clearNotification())
        }, msLength)
    }
}

export default notificationSlice.reducer