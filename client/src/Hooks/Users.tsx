import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setUser } from "../usernameSlice";
import { setSearchedFriend } from "../Redux/Friends/FriendSlice";
import { setPrivateChatroom } from "../Redux/PrivateChatroom/PrivateChatroomSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Login, getLoginStatus , getAllusers} from "../Services/Users/Users";
import { findIfFriend } from "../Services/Friends/Friends";
import { getOnePrivateChatroom } from "../Services/PrivateChatrooms/PrivateChatrooms";
import  {connectWithFriend} from "../Utils/Utils"

axios.defaults.withCredentials = true;

  //Submit login details to log into user account
const useLoginUser = (email: any, password: any) => {
  const user = useSelector((state: RootState) => state.reducer.user.object.username);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>(user); 

  const navigate = useNavigate();




  const submitLoginDetails = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await Login(email, password);
   // console.log(response);

    if (typeof response?.auth != "undefined") {
      switch (response.auth) {
        case true:
          dispatch(setUser(response.user));
          navigate(`/user/${response.user.username}`);
          break;

        case false:
         // console.log("You are not logged in");
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
  const user = useSelector((state: RootState) => state.reducer.user.object.username);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(user);
 
  const getLogin = async () => {
   

    const response = await getLoginStatus();

   // console.log(response);
    if (typeof response?.isLoggedIn != "undefined") {
      switch (response.isLoggedIn) {
        case true:
          navigate(`/user/${userName}`);
         console.log("uko ndani");
         
          break;

        case false:
         // console.log("You are not logged in");
          navigate(`/login`);
          break;
      }
    }
  };


  return {getLogin};
  
  } 




 const  useSearchedUsers =()=>{
  const [searchedUsers, setSearchedUsers] = useState([])
  const [friendship, setfriendship] = useState<boolean | null>(null);
  const myUserId = useSelector((state: RootState) => state.reducer.user.object.userid);
   const dispatch = useDispatch()
  //function definition
    const connectWithFriend = async (myUserId:number, friendsUserId:number, friendsUserName:string,friendShip:string)=>{

      if(myUserId !== friendsUserId){

        const privateChatroomData = await getOnePrivateChatroom(myUserId,friendsUserId)

   
        

      //  console.log(privateChatroomData);

     


      if( privateChatroomData.length  > 0){
       


        const privateChatroom = {
          private_chatroom_id:  privateChatroomData[0].private_chatrooms_id
        }
      ///  console.log(privateChatroom);
        
        
        dispatch(setPrivateChatroom(privateChatroom));
  
      
      }

      
        
        const friend ={
          user_id:friendsUserId,
          user_name:friendsUserName
         }
         dispatch(setSearchedFriend(friend));
  
      //  find out if they are friends
          if(friendShip === 'mayNotBeFriends'){
            const friendshipStatus = await  findIfFriend(myUserId,friendsUserId);
  
            if( typeof friendshipStatus !== "undefined"){
              setfriendship(friendshipStatus);
            }

          }
         

      }

    
       

        


    }



  const getSearchedUsers = async (query:any)=>{


    try{
      const response =  await getAllusers();
    //  console.log(response);

      let data = response.filter((item: any) => {
        return item.user_name.toLowerCase().includes(query)
      });

      let data2 = data.map((item: any, key: number) => {
        return <p  key={key}  onClick={()=>{connectWithFriend(myUserId,item.user_id,item.user_name,"mayNotBeFriends")}}>{item.user_name}</p>;
      });
      setSearchedUsers(data2)
      

    }catch(err){
      console.log(err);
      
    }

    





  }







       return{getSearchedUsers,searchedUsers,  setSearchedUsers ,friendship,   setfriendship, connectWithFriend }
 }

export {useLoginUser , useGetLoginStatus,useSearchedUsers  };
