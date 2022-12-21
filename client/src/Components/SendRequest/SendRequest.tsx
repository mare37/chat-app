import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { sendRequest } from "../../Services/ChatroomRequests/ChatroomRequests";


function SendRequest() {
  const chatroomId = useSelector((state:RootState)=>{
    return state.reducer.chatroomId.chatroom_id
  })

  const userId = useSelector((state:RootState)=>{
    return state.reducer.user.object.userid
  })


 // console.log(Id);
  

  return (
    <div>
      <h3>SEND REQUEST TO JOIN THIS CHATROOM</h3>
      <button onClick={()=>{sendRequest(userId,chatroomId)}}       >SEND REQUEST</button>
    </div>
  );
}

export default SendRequest
