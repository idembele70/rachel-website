import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure
} from "./userRedux"
import {
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
} from "./categoryRedux"
import { publicRequest, userRequest } from '../requestMethod'
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux"

//  LOGIN user
export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const { data } = await publicRequest.post("auth/login", user)
    dispatch(loginSuccess(data))
  } catch (error) {
    dispatch(loginFailure())
  }
}
//  LOGIN user endpoint

//  LOGOUT user
export const logout = async (dispatch) => {
  dispatch(logoutStart())
  try {
    dispatch(logoutSuccess())
  } catch (error) {
    dispatch(logoutFailure())
  }
}
//  LOGOUT user endpoint


//  GET product
export const getProducts = async (dispatch) => {
  dispatch(getProductStart())
  try {
    const { data } = await publicRequest.get("/products/")
    dispatch(getProductSuccess(data))
  } catch (error) {
    dispatch(getProductFailure)
  }
}
//  GET product endpoint

//  DELETE product
export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart())
  try {
    await userRequest.delete(`/products/${id}`)
    dispatch(deleteProductSuccess(id))
  } catch (error) {
    dispatch(deleteProductError)
  }
}
//  DELETE product endpoint

//  UPDATE product
export const updateProduct = async (dispatch, product, id) => {
  dispatch(updateProductStart())
  try {
    const { data } = await userRequest.put(`/products/${id}`, product)
    dispatch(updateProductSuccess({ product: data }))
  } catch (error) {
    dispatch(updateProductFailure())
  }
}
//  UPDATE product endpoint
//  ADD product 
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart())
  try {
    const { data } = await userRequest.post(`products/new/`, product)
    dispatch(addProductSuccess(data))
  } catch (error) {
    dispatch(addProductFailure())
  }
}
//  ADD product endpoint

//  ADD category
export const addCategory = async (dispatch, category) => {
  dispatch(addCategoryStart())
  try {
    const { data } = await userRequest.post("/category/new", category)
    console.log(data)
    dispatch(addCategorySuccess(data))
  } catch (error) {
    console.log(error)
    dispatch(addCategoryFailure())
  }
}
//  ADD category endpoint

// UPDATE category
export const updateCategory = async (dispatch, newInformation, id) => {
  dispatch(updateCategoryStart())
  try {
    const { data } = await userRequest.put(`/category/${id}`, newInformation)
    dispatch(updateCategorySuccess({ category: data }))
  } catch (error) {
    dispatch(updateCategoryFailure())
  }
}
// UPDATE category endpoint
// GET category
export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart())
  try {
    const { data } = await userRequest.get("/category/")
    dispatch(getCategorySuccess(data))
  } catch (error) {
    dispatch(getCategoryFailure())
  }
}
// GET category endpoint

// DELETE category
export const deleteCategory = async (dispatch, id) => {
  dispatch(deleteCategoryStart())
  try {
    await userRequest.delete(`category/${id}`)
    dispatch(deleteCategorySuccess(id))
  } catch (error) {
    dispatch(deleteCategoryFailure())
  }
}
// DELETE category endpoint