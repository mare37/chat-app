import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { RootState } from './store'


const userSlice = createSlice({
    name: "user",
    initialState:{object:{username:"", userid:null} },
    reducers:{
      setUser:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {setUser} = userSlice.actions

  

  export default userSlice.reducer

  