import {useEffect} from "react"



interface props{
    ID:number,
    room:string,
    chatroomName:string,
    joinAchatroom: (ID:number, room:string) => void;
    setChat: (chat:boolean) => void;
    setChatRoomInfo: (chatRoomInfo:boolean) => void;
    setfriendship:(friendShip : boolean | null) => void
   
}

function ChatroomComponent ({ID,room,chatroomName,joinAchatroom, setChat, setChatRoomInfo, setfriendship }:props){


      useEffect(()=>{
        console.log("Chatroom component");
        

      },[])


    return(
        <p  onClick={()=>{
            joinAchatroom(ID, room)
            setChat(true)
            setChatRoomInfo(false)
            setfriendship(null)
          }}>{chatroomName}</p>
    )


}


export default ChatroomComponent