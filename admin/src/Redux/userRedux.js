import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState : {
    isFetching : Boolean(),
    currentUser : null,
    error : Boolean()
  },
  reducers: {
loginStart: (state)=>
    Object.assign(state, {
      isFetching:true
    }),
    loginSuccess : (state, {payload})=>
    Object.assign(state, {
      isFetching: false,
      currentUser: payload
    }),
    loginFailure : (state)=>
    Object.assign(state, {isFetching: false, error: true}),
logoutStart: (state)=>
    Object.assign(state, {
      isFetching:true
    }),
    logoutSuccess : (state)=>
    Object.assign(state, {
      isFetching: false,
      currentUser: null
    }),
    logoutFailure : (state)=>
    Object.assign(state, {isFetching: false, error: true}),
  }
})

export const {loginStart,
  loginFailure,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,} = userSlice.actions
export default userSlice.reducer