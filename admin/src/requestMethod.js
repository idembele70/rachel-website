import axios from "axios"
const baseURL = process.env.REACT_APP_BASE_URL
let TOKEN = null
const persistRoot = JSON.parse(localStorage?.getItem("persist:root"))
if (persistRoot)
  TOKEN = JSON.parse(persistRoot?.user)?.currentUser?.accessToken

export const publicRequest = axios.create({
  baseURL
})
export const userRequest = axios.create({
  baseURL,
  headers: {
    token: `e ${TOKEN}`,
    "content-type": "application/json"
  }
})
