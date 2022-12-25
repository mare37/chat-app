import * as React from "react";

import ChatroomRequest from "../../Components/ChatroomRequest/ChatroomRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function ChatRoomInfo(props: any) {
  const array = useSelector(
    (state: RootState) => state.reducer.UserRequestsArray.object
  );

  const [requests, setRequests]  = React.useState<boolean>(false)

  //console.log(array);

  const arraydata = array.map(( item, index)=>{
   // console.log(item['email']);
    
        return <ChatroomRequest key={index}  userId={item["user_id"]}   username={item["user_name"]} chatroomId={item["fk_chat_room_chat_room_id"]}  />
  })

  //console.log(arraydata);
  

  return (
    <div>
      <div>
        <div>{props.oneChatRoom}</div>
        <div>{`Number of Members: ${props.numberOfMembers}`}</div>
        <div   onClick={(e:  React.MouseEvent<HTMLElement>)=>{setRequests((prevalue)=> !prevalue)}}    >{`Number of Requests: ${props.numberOfRequests}`}</div>
      </div>

      {requests? <div>{arraydata}</div> :"" }

      
    </div>
  );
}

export default ChatRoomInfo;
