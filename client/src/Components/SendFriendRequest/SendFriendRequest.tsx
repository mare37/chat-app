import {useEffect,useState } from "react"
import { sendFriendRequest,getFriendRequest } from "../../Services/FriendRequest/FriendRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function SendFriendRequest(props: any){

    const friend = useSelector((state:RootState)=> state.reducer.SearchedFriend.object)
    const [friendRequestStatus, setFriendRequestStatus] = useState<boolean | null>(false);
    const [friendResponseStatus, setFriendResponseStatus] = useState(false);



        useEffect(()=>{


            const waitForData = async ()=>{

                try{
                    const response = await getFriendRequest(props.myUserId , props.friendSId)

                    console.log(response);
                    setFriendResponseStatus(response.respondToRequest)
                    setFriendRequestStatus(response.friendrequeststatus)

                }catch(err){
                    console.log(err);
                    
                }

               
                
            }

            waitForData();

        },[friend])
  
       let requestOrResposponse;

        if(friendResponseStatus === true && friendRequestStatus === null){

            requestOrResposponse = <button>RESPOND TO REQUEST</button>
            
        }else{
            if(friendRequestStatus){
                requestOrResposponse = "FRIEND REQUEST SENT"
            }else{
                requestOrResposponse =  <button onClick={()=>{sendFriendRequest(props.myUserId, props.friendSId)}}>Send Friend Request</button>

            }
        }






    return(
        <>

        <div>{props.name}</div>

            {requestOrResposponse}
           
          

        </>
    )


}


export default  SendFriendRequest;