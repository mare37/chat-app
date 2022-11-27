import { createSlice, configureStore } from '@reduxjs/toolkit'


const userNameSlice = createSlice({
    name: "username",
    initialState:'',
    reducers:{
      setUsername:(state,action)=>{
        state = action.payload
      }
    }
  })

  export const {setUsername} = userNameSlice.actions

  

  export default userNameSlice.reducer

  