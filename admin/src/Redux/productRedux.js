import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false
  },
  reducers: {
    // GET ALL
    getProductStart: (state) =>
      Object.assign(state, {
        isFetching: true,
        error: false
      }),
    getProductSuccess: (state, action) =>
      Object.assign(state, {
        products: action.payload,
        isFetching: false
      }),
    getProductFailure: (state) =>
      Object.assign(state, {
        error: true,
        isFetching: false
      }),
    // DELETE ONE BY ID
    deleteProductStart: (state) =>
      Object.assign(state, {
        isFetching: true,
        error: false,
      }),
    deleteProductSuccess: (state, { payload }) =>
      Object.assign(state, {
        isFetching: false,
        products: state.products.filter(
          item => item._id !== payload
        )
      }),
    deleteProductError: (state) =>
      Object.assign(state, {
        isFetching: false,
        error: true
      }),
    // UPDATE BY ID
    updateProductStart: (state) => Object.assign(state, {
      isFetching: true,
      error: false
    }),
    updateProductSuccess: (state, action) => {
      state.isFetching = false
      state.products[state.products.findIndex(item => item._id === action.payload.product._id)] = action.payload.product
      state.error = false
    },
    updateProductFailure: (state) =>
      Object.assign(state, {
        isFetching: false,
        error: true
      }),
    // ADD ONE PRODUCT
    addProductStart: (state) =>
      Object.assign(state, {
        isFetching: true,
        error: false
      }),
    addProductSuccess: (state, { payload }) =>
      Object.assign(state, {
        isFetching: false,
        products: [...state.products, payload],
        error: false,
      }),
    addProductFailure: (state) =>
      Object.assign(state, {
        isFetching: false,
        error: true,
      }),
  }
})

export const
  { getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductError,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess } = productSlice.actions
export default productSlice.reducer