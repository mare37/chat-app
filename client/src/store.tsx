import { configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import usernameReducer from "./usernameSlice"



const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, usernameReducer)



export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk]
  })

  export type RootState = ReturnType<typeof store.getState>

  export type AppDispatch = typeof store.dispatch    
  
  export const persistor = persistStore(store)