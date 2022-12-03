import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../usernameSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Login, getLoginStatus } from "../Services/Users";

axios.defaults.withCredentials = true;

  //Submit login details to log into user account
const useLoginUser = (email: any, password: any) => {
  const user = useSelector((state: RootState) => state.object.username);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(user);

  const navigate = useNavigate();




  const submitLoginDetails = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await Login(email, password);
    console.log(response);

    if (typeof response?.auth != "undefined") {
      switch (response.auth) {
        case true:
          dispatch(setUser(response.user));
          navigate(`/user/${response.user.username}`);
          break;

        case false:
          console.log("You are not logged in");
          navigate("/login");
          break;
      }
    }
  };



 
 

  return { submitLoginDetails };
};











 //Find if user is logged in and redirect to user homepage else redirect to login page
const useGetLoginStatus = () =>{
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.object.username);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(user);
 
  const getLogin = async () => {
    console.log("getting login");

    const response = await getLoginStatus();

    console.log(response);
    if (typeof response?.isLoggedIn != "undefined") {
      switch (response.isLoggedIn) {
        case true:
          navigate(`/user/${userName}`);
         console.log("uko ndani");
         
          break;

        case false:
          console.log("You are not logged in");
        //  navigate(`/login`);
          break;
      }
    }
  };


  return {getLogin};
  
  } 

export {useLoginUser , useGetLoginStatus };
