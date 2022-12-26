import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getJoinedChatrooms } from "../Services/ChatroomUsers/ChatroomUsers"
import { useState } from "react";


interface userObject{
    chat_roomUsers_id:number,
    chatroom_id:number,
    chatroom_name:string,
    fk_admin_users_user_id:number,
    fk_chat_room_chat_room_id:number,
    fk_topic_categories_topic_category_id:number,
    fk_users_users_id:number   
}



const useMyChatrooms = ()=>{
    const user = useSelector((state:RootState)=> state.reducer.user.object)

    const [joinedRooms, setJoinedRoomsData] = useState<Array<userObject>>([]);


    const joinedChatrooms = async ()=>{

        const response = await getJoinedChatrooms(user.userid);

      //  console.log(response);

        
            //const array = response?.data;
            setJoinedRoomsData(response)
     

    }
    //console.log(joinedRoomsdata);

  

  
    
    


    


   return {joinedChatrooms, joinedRooms  }

}


export { useMyChatrooms }

