//import { useSelector, useDispatch } from "react-redux";
//import { RootState } from "../store";
import { getOnePrivateChatroom } from "../Services/PrivateChatrooms/PrivateChatrooms";
import { setPrivateChatroom } from "../Redux/PrivateChatroom/PrivateChatroomSlice";
import { setSearchedFriend } from "../Redux/Friends/FriendSlice";



const connectWithFriend = async (myUserId:number, friendsUserId:number, friendsUserName:string)=>{
   // const dispatch = useDispatch()
    if(myUserId !== friendsUserId){

      const privateChatroomData = await getOnePrivateChatroom(myUserId,friendsUserId);

    if( privateChatroomData.length  > 0){
     
      const privateChatroom = {
        private_chatroom_id:  privateChatroomData[0].private_chatrooms_id
      }

      const friend = {
        user_id:friendsUserId,
        user_name:friendsUserName
       }
         

       const object = { privateChatroom: privateChatroom, friend:friend }


       return object;
       
    }

    
      
   
  
      

    }

  
     

      


  }

  export {connectWithFriend}