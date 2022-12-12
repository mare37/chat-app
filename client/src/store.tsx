import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import userReducer from "./usernameSlice"
import  singlechatroomReducer from "./Redux/Chatrooms/SingleChatroomSlice"


const rootReduce = combineReducers({
  user: userReducer,
  singlechatroom: singlechatroomReducer
})



const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig,rootReduce)




export const store = configureStore({
    reducer:{
      reducer: persistedReducer,
    },
    middleware: [thunk]
  })

  export type RootState = ReturnType<typeof store.getState>

  export type AppDispatch = typeof store.dispatch    
  
  export const persistor = persistStore(store)