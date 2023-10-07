import {combineReducers, configureStore} from "@reduxjs/toolkit";
import messengerReducer from "./reducers/messageSlice";


const rootReducer = combineReducers({
    messengerReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}