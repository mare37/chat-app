import {useState} from "react"
import { getUserChatRooms } from "../Services/Chatrooms";

interface Item {
    chatroom_id: 0;
    chatroom_name: "";
    fk_topic_categories_topic_category_id: 0;
    fk_admin_users_user_id: 0;
  }


const useGetUserChatRooms =  ()=>{
    const [myChatRooms, setMyChatRooms] = useState<Array<Item>>([]);

    const getChatrooms = async (userId: number)=>{


        const response = await getUserChatRooms( userId)

        console.log(response);
        setMyChatRooms(response);
        
    }

  
    



return { getChatrooms, myChatRooms}
    
}

export{useGetUserChatRooms}


