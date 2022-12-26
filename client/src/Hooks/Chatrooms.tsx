import { useState ,useContext} from "react";
import { getUserChatRooms ,getOneChatroom} from "../Services/Chatrooms/Chatrooms";
import { getChatRoomRequests  } from "../Services/ChatroomRequests/ChatroomRequests"
import axios from "axios";
import { setSingleChatroom } from "../Redux/Chatrooms/SingleChatroomSlice";
import { SetUserRequestArray } from "../Redux/Chatroom_Requests/UserRequestsArraySlice";
import { setChatroomId } from "../Redux/Chatroom_Requests/ChatRoomIdSlice";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { io } from "socket.io-client";
import { SocketContext } from "../context";

interface Item {
  chatroom_id: 0;
  chatroom_name: "";
  fk_topic_categories_topic_category_id: 0;
  fk_admin_users_user_id: 0;
}



//Get chat rooms where this user account is admin.Chat rooms that belong to this user
const useGetUsersChatRooms = () => {
  const dispatch = useDispatch();
  const singleChatroom = useSelector((state: RootState) => state.reducer.singlechatroom.object);
  const [myChatRooms, setMyChatRooms] = useState<Array<Item>>([]);
  const [oneChatRoom, setoneChatRoom] = useState({
    chatroom_name: singleChatroom.chatroom_name,
    chatroom_membersNo: singleChatroom.chatroom_membersNo,
  });

  //console.log(singleChatroom);
  

  //first function
  const getChatrooms = async (userId: number)  => {
    const response = await getUserChatRooms(userId)

    //console.log(response);   
    setMyChatRooms(response);
  };


  //second function

  const getChatRoomInfo = async (id: number) => {
   
    //console.log(id);
    
    const oneChatRoom = myChatRooms.filter((item) => {
      
      
      if (item.chatroom_id === id) {
       // console.log(item);
        
        return true;
      } else {
        return false;
      }
    });

    const  response =  await getOneChatroom(id)
     const   data  = await getChatRoomRequests(id);

     const numberOfRequests = data.length

     //console.log(data);
     

   
    const arrayLength = response.data.length
   // console.log(arrayLength);

    const chatroomInfo = {
      chatroom_name: oneChatRoom[0].chatroom_name,
      chatroom_id: oneChatRoom[0].chatroom_id,
      chatroom_membersNo: arrayLength,
      chatroom_requestNo: numberOfRequests
    }
   // console.log(chatroomInfo);
    
    dispatch(  SetUserRequestArray( data ) ) 
    dispatch(setSingleChatroom( chatroomInfo )  );

    

    //  let arrayLength = 0

  /*  axios
      .get(`http://localhost:5000/api/chatroom_users/${id}`)
      .then((response) => {
       // console.log(response.data.data.length);

        const arrayLength = response.data.data.length

      //  console.log(response.data);
        

       
        

        const chatroomInfo = {
          chatroom_name: oneChatRoom[0].chatroom_name,
          chatroom_id: oneChatRoom[0].chatroom_id,
          chatroom_membersNo: arrayLength,
        }

       // console.log(chatroomInfo);

        dispatch(setSingleChatroom( chatroomInfo )  )

      
      });*/

   // console.log(oneChatRoom);
  };






  return {  getChatRoomInfo ,    getChatrooms, myChatRooms,  oneChatRoom  };
};




//Get chat rooms that have been searched by this user in the search bar
const useGetSearchedChatRooms = () => {
 const socket = useContext(SocketContext)
 const dispatch = useDispatch();


const user = useSelector((state: RootState) => state.reducer.user.object);
  const [searchItems, setSearchItems] = useState([]);

  const joinChatRoom =  async (roomId: number)=>{

    const Id ={chatroom_id:roomId}
     
    dispatch(setChatroomId(Id))

    console.log("THIS FUNCTION 2 RAN");

    
    await socket.emit("join_room", {  
      room:  roomId,
      firstName: user.username,
      userId: user.userid
      
    });
  }


  const getSeachedChartRooms = (query: any) => {
    axios.get("http://localhost:5000/api/chat_rooms").then((response) => {
     
      
      let data = response.data.filter((item: any) => {
        return item.chatroom_name.toLowerCase().includes(query)
      });
      console.log(data);

      let data2 = data.map((item: any, key: number) => {
        return <p  onClick={()=>{joinChatRoom(item.chatroom_id)}} key={key}>{item.chatroom_name}</p>;
      });

      setSearchItems(data2);
    });
  };

  


  return { getSeachedChartRooms, searchItems, setSearchItems, joinChatRoom };
};

export { useGetUsersChatRooms, useGetSearchedChatRooms };
