import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authSlice";
import inboxslice from "./inboxSlice";
import mailSlice from './sentemailSlice'

const store = configureStore({
    reducer: {
        auth : authslice,
        mailbox : mailSlice,
        inboxmail : inboxslice
    }
})

export default store;