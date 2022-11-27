import { useParams } from "react-router-dom";
import usernameReducer from "../../usernameSlice"
import { configureStore } from '@reduxjs/toolkit'
function UserAccount (){

    const store = configureStore({
        reducer:{
          userName:usernameReducer
        }
    
      })
    console.log(store.getState());
    

    const {username} = useParams();

    return(
        <div>{`WELCOME ${username}`}</div>
    )
}

export default UserAccount;