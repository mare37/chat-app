import { configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'

import usernameReducer from "./usernameSlice"

const store = configureStore({
    reducer:{
      userName:usernameReducer
    }

  })

  export type RootState =ReturnType<typeof store.getState>

  export type AppDispatch = typeof store.dispatch