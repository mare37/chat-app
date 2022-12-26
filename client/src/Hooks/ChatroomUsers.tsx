import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getJoinedChatrooms } from "../Services/ChatroomUsers/ChatroomUsers"
import { useState } from "react";
import { setSingleChatroom } from "../Redux/Chatrooms/SingleChatroomSlice";


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
    const dispatch = useDispatch();

    const [joinedRooms, setJoinedRoomsData] = useState<Array<userObject>>([]);


    const joinedChatrooms = async ()=>{

        const response = await getJoinedChatrooms(user.userid);

      //  console.log(response);

        
            //const array = response?.data;
            setJoinedRoomsData(response)
    }
    //console.log(joinedRoomsdata);

    const joinAchatroom = (chatroomId:number)=>{
        const oneChatRoom = joinedRooms.filter((item) => {
      
      
            if (item.chatroom_id === chatroomId) {
             // console.log(item);
              
              return true;
            } else {
              return false;
            }

          
          });

          const chatroomInfo = {
            chatroom_name: oneChatRoom[0].chatroom_name,
            chatroom_id: oneChatRoom[0].chatroom_id,
            chatroom_membersNo: 0,
            chatroom_requestNo: 0
          }

          dispatch(setSingleChatroom( chatroomInfo )  );
    }

  

  

  
    
    


    


   return {joinedChatrooms, joinedRooms,  joinAchatroom  }

}


export { useMyChatrooms }

