import { createSlice, configureStore } from '@reduxjs/toolkit'



const ChatRoomIdSlice = createSlice({
    name: "ChatRoomId",
    initialState:{
   
        chatroom_id:0,
       
      },
    reducers:{
      setChatroomId:(state ,action)=>{ 
       // const user = action.payload
        state.chatroom_id = action.payload
         
      }
    }
  })

  export const {setChatroomId} = ChatRoomIdSlice.actions

  

  export default ChatRoomIdSlice.reducer
