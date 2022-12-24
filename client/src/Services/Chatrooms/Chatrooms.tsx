import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import * as React from "react";

const getUserChatRooms = async ( userId: number) => {
  //const userId = useSelector((state: RootState) => state.object.userid);
  /*  axios
      .get("http://localhost:5000/api/chat_rooms", {
        params: { userId: userId },
      })
      .then((response) => {
        setMyChatRooms(response.data);
      });*/

  const response =  await axios.get("http://localhost:5000/api/chat_rooms", {
    params: { userId: userId },
  });


    try{
       // console.log(response);

        return response.data
        

    }catch(err){

    }
};

const getOneChatroom = async (id: number)=>{


  try{
    const response = await axios.get(`http://localhost:5000/api/chatroom_users/${id}`)

    return response.data

  }catch(err){
    console.log(err);
    
  }

 



}

export { getUserChatRooms, getOneChatroom }
