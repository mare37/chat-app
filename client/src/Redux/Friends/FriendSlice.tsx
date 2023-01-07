import { createSlice, configureStore } from '@reduxjs/toolkit'



const FriendSlice = createSlice({
    name: "SearchedFriend",
    initialState:{object:{
       user_id:0,
       user_name:""

      } },
    reducers:{
      setSearchedFriend:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const { setSearchedFriend} =  FriendSlice.actions

  

  export default  FriendSlice.reducer
