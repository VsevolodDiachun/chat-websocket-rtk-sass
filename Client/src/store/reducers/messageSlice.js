import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    connected: false,
    username: '',
}

export const messengerSlice = createSlice({
    name: 'wsMessenger',
    initialState,
    reducers: {
        setConnected(state, action) {
            state.connected = action.payload
        },
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
        setUsername(state, action) {
            state.username = action.payload
        }
    }
})

export default messengerSlice.reducer;