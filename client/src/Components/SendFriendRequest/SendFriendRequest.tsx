import { useEffect, useState } from "react";
import {
  sendFriendRequest,
  getFriendRequest,
  rejectFriendRequest,  
  acceptFriendRequest
} from "../../Services/FriendRequest/FriendRequest";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function SendFriendRequest(props: any) {

  const friend = useSelector((state: RootState) => state.reducer.SearchedFriend.object );
  const [friendRequestStatus, setFriendRequestStatus] = useState<boolean | null>(false);
  const [friendResponseStatus, setFriendResponseStatus] = useState(false);



  useEffect(() => {
    const waitForData = async () => {
      try {
        const response = await getFriendRequest(
          props.myUserId,
          props.friendSId
        );

        console.log(response);
        setFriendResponseStatus(response.respondToRequest);
        setFriendRequestStatus(response.friendrequeststatus);
      } catch (err) {
        console.log(err);
      }
    };

    waitForData();
  }, [friend]);




  let requestOrResponse;

  if (friendResponseStatus === true && friendRequestStatus === null) {
    requestOrResponse = (
      <div>
        <button   onClick={()=>{acceptFriendRequest(props.myUserId, props.friendSId)}}>ACCEPT</button>
        <button  onClick={()=>{rejectFriendRequest(props.myUserId, props.friendSId)}}> REJECT</button>
      </div>
    );
  } else {
    if (friendRequestStatus) {
      requestOrResponse = "FRIEND REQUEST SENT";
    } else {
      requestOrResponse = (
        <button
          onClick={() => {
            sendFriendRequest(props.myUserId, props.friendSId);
          }}
        >
          Send Friend Request
        </button>
      );
    }
  }

  return (
    <>
      <div>{props.name}</div>

      {requestOrResponse}
    </>
  );
}

export default SendFriendRequest;
