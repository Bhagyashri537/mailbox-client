import { createSlice } from "@reduxjs/toolkit";


const initialsentmailState = {
    sentmail : []
}

const mailSlice = createSlice({
    name : 'sentMail',
    initialState : initialsentmailState,
    reducers :{
        addSentMail (state, action){
            state.sentmail = action.payload
        }
    }

    
})

export const mailActions = mailSlice.actions

export default mailSlice.reducer