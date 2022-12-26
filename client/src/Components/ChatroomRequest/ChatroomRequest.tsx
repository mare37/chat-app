import "./ChatroomRequest.css";
import {acceptRequest, rejectRequest  } from "../../Services/ChatroomRequests/ChatroomRequests"


interface props {
  userId:number
  username: string;
  chatroomId: number;
}

function ChatroomRequest({ username, chatroomId,userId }: props) {
  return (
    <div>
      <p className="name">{username}</p>
      <p className="name">{chatroomId}</p> <button onClick={()=>(acceptRequest(userId, chatroomId))} >Accept</button>
      <button  onClick={()=>{rejectRequest(userId, chatroomId)}}      >Reject</button>
    </div>
  );
}

export default ChatroomRequest;
