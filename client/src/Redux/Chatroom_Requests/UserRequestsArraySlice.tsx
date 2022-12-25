import { createSlice, configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'


type x = null | boolean;
const SendRequest : x = null;

const UserRequestArraySlice = createSlice({
    name: "SendRequestSlice ",
    initialState:{object: [] },
    reducers:{
        SetUserRequestArray:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {SetUserRequestArray} =  UserRequestArraySlice.actions

  export default UserRequestArraySlice.reducer