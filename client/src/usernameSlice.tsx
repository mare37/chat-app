import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { RootState } from './store'


const userNameSlice = createSlice({
    name: "username",
    initialState:{value:""},
    reducers:{
      setUsername:(state ,action)=>{
        state.value = action.payload
      }
    }
  })

  export const {setUsername} = userNameSlice.actions

  

  export default userNameSlice.reducer

  