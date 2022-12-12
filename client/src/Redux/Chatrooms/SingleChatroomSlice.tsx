import { createSlice, configureStore } from '@reduxjs/toolkit'



const SingleChatroomSlice = createSlice({
    name: "OneSingleChatroom",
    initialState:{object:{
        chatroom_name: "",
        chatroom_id:0,
        chatroom_membersNo: 0,
      } },
    reducers:{
      setSingleChatroom:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {setSingleChatroom} = SingleChatroomSlice.actions

  

  export default SingleChatroomSlice.reducer
