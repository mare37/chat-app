import { useState,useEffect } from "react";
import {useSelector, useDispatch } from "react-redux"
import {RootState}  from "../store"
import {setUser} from "../usernameSlice"
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;




const useDetails = (  email:any,password:any )=>{
    const user = useSelector((state: RootState) => state.object.username)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState(user);
    
    const navigate = useNavigate();

  

    const submitLoginDetails = async (event: React.SyntheticEvent)=>{
     
        event.preventDefault();


       
        




    
        try {
          const response = await axios.post("http://localhost:5000/api/login", {
            email: email,
            password: password,
          });
          console.log(response.data);
          
    
          if (response.data.auth) {
            console.log("you are in");
            const user ={username:response.data.user_name, userid:response.data.user_id}
            dispatch(setUser(user));
            console.log(response.data);
            
           
    
           navigate(`/user/${response.data.user_name}`)
          } else {
            console.log("you are out");
          }
        } catch (err) {
          console.log(err);
        }
    
        //console.log(response.data);
    
    
    }

        return { submitLoginDetails  }






}




export default useDetails