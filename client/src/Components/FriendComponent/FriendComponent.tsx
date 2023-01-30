import {useEffect} from "react"


interface props{
    myUserId:number,
    friendsUserName:string,
    friendsId:number,
    setfriendship:(friendShip:boolean)=> void,
    connectWithFriend: (myUserId:number,friendsUserId:number,friendsUserName:string,friendShip:string) =>void;
}


function FriendComponent({ myUserId,  friendsUserName, friendsId ,  setfriendship ,connectWithFriend }:props){

    useEffect(()=>{
        console.log("Friends component");
        

      },[])



    return(
        <p  onClick={()=>{
            connectWithFriend(myUserId,friendsId,friendsUserName,"AreFriends")
            setfriendship(true);
        }}    >{friendsUserName}</p>
    )
}


export default FriendComponent