import { createSlice, configureStore } from '@reduxjs/toolkit'



const PrivateChatroomSlice = createSlice({
    name: "PrivateChatroom",
    initialState:{object:{
       private_chatroom_id:0,
     

      } },
    reducers:{
      setPrivateChatroom:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {  setPrivateChatroom} =  PrivateChatroomSlice.actions

  

  export default PrivateChatroomSlice.reducer