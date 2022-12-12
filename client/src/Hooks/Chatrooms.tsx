import { useState } from "react";
import { getUserChatRooms } from "../Services/Chatrooms";
import axios from "axios";
import * as React from "react";
interface Item {
  chatroom_id: 0;
  chatroom_name: "";
  fk_topic_categories_topic_category_id: 0;
  fk_admin_users_user_id: 0;
}



//Get chat rooms where this user account is admin.Chat rooms that belong to this user
const useGetUsersChatRooms = () => {
  const [myChatRooms, setMyChatRooms] = useState<Array<Item>>([]);
  const [oneChatRoom, setoneChatRoom] = useState({
    chatroom_name: "",
    chatroom_membersNo: 0,
  });

  //first function
  const getChatrooms = async (userId: number) => {
    const response = await getUserChatRooms(userId);

    console.log(response);
    setMyChatRooms(response);
  };


  //second function

  const getChatRoomInfo = (id: number) => {



    const oneChatRoom = myChatRooms.filter((item) => {
      if (item.chatroom_id === id) {
        return true;
      } else {
        return false;
      }
    });

    //  let arrayLength = 0;

    axios
      .get(`http://localhost:5000/api/chatroom_users/${id}`)
      .then((response) => {
        console.log(response.data.data.length);

        const arrayLength = response.data.data.length;

        setoneChatRoom({
          chatroom_name: oneChatRoom[0].chatroom_name,
          chatroom_membersNo: arrayLength,
        });
      });

   // console.log(oneChatRoom);
  };






  return {  getChatRoomInfo ,    getChatrooms, myChatRooms,  oneChatRoom  };
};




//Get chat rooms that have been searched by this user in the search bar
const useGetSearchedChatRooms = () => {
  const [searchItems, setSearchItems] = useState([]);

  const getSeachedChartRooms = (query: any) => {
    axios.get("http://localhost:5000/api/chat_rooms").then((response) => {
      let data = response.data.filter((item: any) => {
        return item.chatroom_name.toLowerCase().includes(query);
      });

      let data2 = data.map((item: any, key: number) => {
        return <p key={key}>{item.chatroom_name}</p>;
      });

      setSearchItems(data2);
    });
  };

  return { getSeachedChartRooms, searchItems, setSearchItems };
};

export { useGetUsersChatRooms, useGetSearchedChatRooms };
