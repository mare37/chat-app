import {useEffect,useState } from "react"
import { sendFriendRequest,getFriendRequest } from "../../Services/FriendRequest/FriendRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function SendFriendRequest(props: any){

    const friend = useSelector((state:RootState)=> state.reducer.SearchedFriend.object)
    const [friendRequestStatus, setFriendRequestStatus] = useState(false);


        useEffect(()=>{


            const waitForData = async ()=>{

                const response = await getFriendRequest(props.myUserId , props.friendSId)

                console.log(response);
                setFriendRequestStatus(response)
                
            }

            waitForData();

        },[friend])
  
   








    return(
        <>

        <div>{props.name}</div>

            {friendRequestStatus?  "FRIEND REQUEST SENT":  <button onClick={()=>{sendFriendRequest(props.myUserId, props.friendSId)}}>Send Friend Request</button> }
           
          

        </>
    )


}


export default  SendFriendRequest;