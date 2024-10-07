import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        sendNotification(state, action) {
            return action.payload
        },
        deleteNotification() {
            return initialState
        },
    },
})

export const { sendNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer