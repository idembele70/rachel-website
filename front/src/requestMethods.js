import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`
const persistRoot = JSON.parse(localStorage.getItem("persist:root"))
const TOKEN = persistRoot
  ? JSON.parse(persistRoot?.user)?.currentUser?.accessToken
  : ""
export const publicRequest = axios.create({
  baseURL: BASE_URL
})
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `e ${TOKEN}`
  }
})
