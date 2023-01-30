import {useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

import { connectWithFriend } from "../Utils/Utils";
import { getAllMyFriends } from "../Services/Friends/Friends";


interface friendObject{
  email: string,
  fk_friend_users_user_id: number,
  fk_friends_users_user_id: null,
  fk_me_users_user_id: number,
  friends_id: number,
  password: string,
  user_id: number,
  user_name: string
}

const useGetFriends = ()=>{

  const user = useSelector((state:RootState)=> state.reducer.user.object)
  const [friends, setFriends] = useState<Array<friendObject>>([])

  const getFriends = async (userId:number)=>{

    console.log(userId);
    


    try{
      const response = await getAllMyFriends(userId);

   //   console.log(response);
     setFriends(response)
      if(typeof response != "undefined" ){
        //setFriends(response)
       
      }
    

    
      
    }catch(err){
      console.log(err);
      
    }


  
  
    

    

  }

 



  return {getFriends, friends }

}


export {useGetFriends}