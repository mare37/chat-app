import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import userReducer from "./usernameSlice"
import  singlechatroomReducer from "./Redux/Chatrooms/SingleChatroomSlice"
import chatroomIdReducer from "./Redux/Chatroom_Requests/ChatRoomIdSlice"
import sendRequestReducer from "./Redux/Chatroom_Requests/SetRequestSlice"
import UserRequestsReducer from "./Redux/Chatroom_Requests/UserRequestsArraySlice"
import SearchedFriendReducer from "./Redux/Friends/FriendSlice";
import PrivateChatroomReducer from "./Redux/PrivateChatroom/PrivateChatroomSlice"


const rootReduce = combineReducers({
  user: userReducer,
  singlechatroom: singlechatroomReducer,
  chatroomId: chatroomIdReducer,
  sendRequest: sendRequestReducer,
  UserRequestsArray: UserRequestsReducer, 
  SearchedFriend : SearchedFriendReducer,
  PrivateChatroom: PrivateChatroomReducer
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