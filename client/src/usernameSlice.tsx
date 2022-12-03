import { createSlice, configureStore } from '@reduxjs/toolkit'



const userSlice = createSlice({
    name: "user",
    initialState:{object:{username:"", userid:0} },
    reducers:{
      setUser:(state ,action)=>{ 
       // const user = action.payload
        state.object = action.payload
         
      }
    }
  })

  export const {setUser} = userSlice.actions

  

  export default userSlice.reducer

  