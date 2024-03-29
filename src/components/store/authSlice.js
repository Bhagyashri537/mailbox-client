
import { createSlice } from "@reduxjs/toolkit"



const initialstate = {
    isLogin:false,
    idToken : localStorage.getItem('idToken')
}




const authslice = createSlice({
    name:'authentication',
    initialState:initialstate,
    reducers:{
        LogIn(state,action){
            localStorage.setItem('idToken',action.payload)
            state.isLogin = true
            state.idToken = action.payload

        },
        logOut(state){
          state.isLogin = false
          localStorage.removeItem('idToken')
          localStorage.removeItem('email')
        }

    }

})




export const authAction = authslice.actions

export default authslice.reducer