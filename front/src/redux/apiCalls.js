import { publicRequest, userRequest } from "requestMethods"
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from "./userRedux"
// LOGIN START
export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const res = await publicRequest.post("/auth/login", user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}
// LOGIN ENDPOINT
// LOGOUT START
export const logout = async (dispatch) => {
  dispatch(logoutStart())
  try {
    await dispatch(logoutSuccess())
  } catch (error) {
    dispatch(logoutFailure())
  }
}
// LOGOUT ENDPOINT
// REGISTER START
export const register = async (dispatch, user) => {
  dispatch(signUpStart())
  try {
    await publicRequest.post("/auth/register", user)
    dispatch(signUpSuccess())
  } catch (error) {
    dispatch(signUpFailure())
  }
}
// REGISTER ENDPOINT
// UPDATE USER START
export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUserStart())
  try {
    const { data } = await userRequest.put(`/users/${id}`, user)
    dispatch(updateUserSuccess(data))
  } catch (error) {
    dispatch(updateUserFailure())
  }
}

// UPDATE USER ENDPOINT
