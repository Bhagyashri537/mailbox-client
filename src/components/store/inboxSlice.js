import { createSlice } from "@reduxjs/toolkit";

const initialinboxState = {
    inbox:[],
    showMsg: true
}

const inboxslice = createSlice({
    name:'inbox',
    initialState:initialinboxState,
    reducers:{
        setinbox(state,action){
            state.inbox = action.payload
        },
        setReadMessage(state, action){
            state.showMsg = action.payload
        }
    }

    
})

export const inboxAction = inboxslice.actions

export default inboxslice.reducer