import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    isFetching: Boolean(),
    error: Boolean()
  },
  reducers: {
    loginStart: (state) => {
      Object.assign(state, { isFetching: true })
    },
    loginSuccess: (state, action) => {
      Object.assign(state, {
        isFetching: false,
        currentUser: action.payload,
        error: false
      })
    },
    loginFailure: (state) => {
      Object.assign(state, {
        isFetching: false,
        error: true
      })
    },
    logoutStart: (state) => {
      Object.assign(state, { isFetching: true })
    },
    logoutSuccess: (state) => {
      Object.assign(state, { isFetching: false, currentUser: {}, error: false })
    },
    logoutFailure: (state) => {
      Object.assign(state, {
        isFetching: false,
        error: true
      })
    },
    signUpStart: (state) => {
      Object.assign(state, { isFetching: true })
    },
    signUpSuccess: (state) => {
      Object.assign(state, { isFetching: false, error: false })
    },
    signUpFailure: (state) => {
      Object.assign(state, {
        isFetching: false,
        error: true
      })
    },
    updateUserStart: (state) => {
      Object.assign(state, { isFetching: true, error: false })
    },
    updateUserSuccess: (state, { payload: { password, ...others } }) => {
      Object.assign(state, {
        isFetching: false,
        currentUser: { ...state.currentUser, ...others },
        error: false
      })
    },
    updateUserFailure: (state) => {
      Object.assign(state, {
        isFetching: false,
        error: true
      })
    }
  }
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} = userSlice.actions
export default userSlice.reducer
