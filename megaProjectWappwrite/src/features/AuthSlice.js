import {createSlice} from '@reduxjs/toolkit'

const initialState= {
    isLoggedIn: false,
    userData: null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        isUserLoggedIn : (state, action)=>{
           state.isLoggedIn = true;
           state.userData = action.payload.userData
        },
        isUserLoggedOut: (state)=>{
          state.isLoggedIn = false;
          state.userData = null
        }

    }

})

export const {isUserLoggedIn, isUserLoggedOut} = authSlice.actions
export default authSlice.reducer