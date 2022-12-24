import { createSlice, configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'


type x = null | boolean;
const SendRequest : x = null;

const SendRequestSlice = createSlice({
    name: "SendRequestSlice ",
    initialState:{object: {SendRequest :true,message:"" } },
    reducers:{
        SetsendRequest:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {SetsendRequest} =  SendRequestSlice.actions

  

  export default  SendRequestSlice.reducer
