import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { sendRequest, checkRequest } from "../../Services/ChatroomRequests/ChatroomRequests";
import { useEffect ,useState} from "react";
import { request } from "http";


function SendRequest() {
  const chatroomId = useSelector((state:RootState)=>{
    return state.reducer.chatroomId.object.chatroom_id
  })

  const userId = useSelector((state:RootState)=>{
    return state.reducer.user.object.userid
  })

  const [requestSent , setRequestSent] = useState<boolean | null>(false)

 // const fetch = 


 // console.log(Id);

 useEffect( ()=>{
 console.log(chatroomId);

   const waitForData = async ()=>{
             const response = await checkRequest(userId,chatroomId)
             
             if(typeof response === "boolean"){
               setRequestSent(response)
              console.log(response);
              
             }
           
            // console.log(response);
             
   }
   waitForData();
  
 
     //  const request = 
     //  console.log(request);
    
    //   checkRequest(userId,chatroomId) 
     
  

 },[])

  

  return (
    <div>
      <h3>SEND REQUEST TO JOIN THIS CHATROOM</h3>
      {requestSent? "Request Already Sent" : <button onClick={()=>{sendRequest(userId,chatroomId)}} >SEND REQUEST</button>   }
    
    </div>
  );
}

export default SendRequest
