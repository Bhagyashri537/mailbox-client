import { configureStore } from "@reduxjs/toolkit";
import mailSlice from './sentemailSlice'

const store = configureStore({
    reducer: {
        mailbox : mailSlice
    }
})

export default store;