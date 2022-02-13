import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import productReducer from './productRedux'
import userReducer from './userRedux'
import categoryReducer from './categoryRedux'
import orderReducer from './orderRedux'
const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const rootReducer = combineReducers({ 
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export default store