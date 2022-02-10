import { createSlice } from '@reduxjs/toolkit'
const category = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //ADD a new category
    addCategoryStart: (state) =>
      Object.assign(state, { isFetching: true, error: false }),
    addCategorySuccess: (state, { payload }) =>
      Object.assign(state, {
        isFetching: false,
        categories: [...state.categories, payload]
      }),
    addCategoryFailure: (state) =>
      Object.assign(state,
        {
          isFetching: false,
          error: true
        }),
    //ADD new category 
    //UPDATE one category endpoint
    updateCategoryStart: (state) =>
      Object.assign(state, { isFetching: true })
    ,
    updateCategorySuccess: (state, { payload }) => {
      state.isFetching = false
      state.categories[state.categories.findIndex(category => category._id === payload.category._id)] = payload.category
      state.error = false
    },
    updateCategoryFailure: (state) =>
      Object.assign(state,
        {
          isFetching: false,
          error: true
        }),
    // DELETE one category
    deleteCategoryStart: (state) =>
      Object.assign(state, { isFetching: true })
    ,
    deleteCategorySuccess: (state, { payload }) => Object.assign(
      state, {
      isFetching: false,
      categories: state.categories.filter(category => category._id !== payload)
    }
    ),
    deleteCategoryFailure: (state) =>
      Object.assign(state,
        {
          isFetching: false,
          error: true
        }),
    // DELETE one category endpoint
    // GET all product
    getCategoryStart: (state) =>
      Object.assign(state, { isFetching: true })
    ,
    getCategorySuccess: (state, { payload }) => Object.assign(
      state, {
      isFetching: false,
      categories: payload
    }
    ),
    getCategoryFailure: (state) =>
      Object.assign(state,
        {
          isFetching: false,
          error: true
        })
  }
})

export default category.reducer
export const {
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
} = category.actions