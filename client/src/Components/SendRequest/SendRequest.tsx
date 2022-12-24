import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { sendRequest, checkRequest } from "../../Services/ChatroomRequests/ChatroomRequests";
import { useEffect ,useState} from "react";
import {   SetsendRequest } from "../../Redux/Chatroom_Requests/SetRequestSlice"


function SendRequest() {
   
  const dispatch = useDispatch()
    
  const chatroomId = useSelector((state:RootState)=>{
    return state.reducer.chatroomId.object.chatroom_id
  })

  const userId = useSelector((state:RootState)=>{
    return state.reducer.user.object.userid
  })

  const requestSent= useSelector((state:RootState)=>{
    return state.reducer.sendRequest.object
  })

 useEffect( ()=>{
 //console.log(chatroomId);
 console.log("WE ARE ON SEND REQUEST COMPONENT");
 


   const waitForData = async ()=>{
            console.log("This request funtion has been called");
            
             const response = await checkRequest(userId,chatroomId)
             
             if(typeof response === "boolean"){

              let  requestBooleanValue = {SendRequest : response }
      
              dispatch(SetsendRequest(requestBooleanValue))
              // setRequestSent(response)
              console.log(response);
              
             }          
   }
   waitForData();
  
 },[requestSent.message])

useEffect(()=>{
  console.log("finally");
  

},[requestSent.message])
 

  

  return (
    <div>
      <h3>SEND REQUEST TO JOIN THIS CHATROOM</h3>
      {requestSent.SendRequest? "Request Already Sent" : <button onClick={()=>{sendRequest(userId,chatroomId)}} >SEND REQUEST</button>   }
    
    </div>
  );
}

export default SendRequest
