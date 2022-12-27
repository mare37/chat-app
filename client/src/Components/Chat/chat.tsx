import { useEffect, useState, FC,useContext } from "react";
import * as React from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import  {SocketContext} from "../../context"



   interface Props {
    username:string,
    chatroom_id: number
   }


function Chat ({username, chatroom_id}: Props ) {
  const socket = useContext(SocketContext)

  const singleChatroom = useSelector(
    (state: RootState) => state.reducer.singlechatroom.object
  );
  const user = useSelector((state: RootState) => state.reducer.user.object);
  const currentRoom = useSelector((state: RootState) => state.reducer.sendRequest.object.currentRoom);




  const [message, setMessage] = useState<string[]>([]);
  const [messageToBeSent, setmessageToBeSent] = useState<string>("");
  const [roomMessage, setRoomMessage] = useState<string>("");
 


  const joinRoom = async (currentroom:number) => {
    
    await socket.emit("join_room", { 
      room: singleChatroom.chatroom_id,
      firstName: user.username,
      userId: user.userid,
      currentRoom:currentroom
      
    });
   
  };

  
  

  useEffect(() => {
    console.log("Chat rendered");
    
    setMessage([""])
    joinRoom(currentRoom);
  }, [singleChatroom.chatroom_id]);


  useEffect(() => {
      
    socket.on("room_joined_sucessfully", (data) => {
       // console.log(data);
        //setChat(data[1])
      
     // setRoomMessage(data);
    });
  }, [socket]);

  

  //send message
  const sendMessage = async () => {
    if (messageToBeSent.length > 0) {
      await socket.emit("send_message", {
        room: singleChatroom.chatroom_id,
        messageToBeSent: messageToBeSent,
        authorFirstName: user.username,
        
      });
    } else {
      console.log("You havent typed anything");
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log(data);

      setMessage((prev) => {
        return [...prev, data];
      });
    });
  }, [socket]);

  const allMessages: any = message
    .slice(0)
    .reverse()
    .map((item, index) => {
      return (
        <div
        key={index}
          className={
            username === item[0] 
              ? "text-message active"
              : "text-message"
          }
        >
          <p className={username === item[0]
              ? "text-paragraph"
              : "text-paragraph active" }   key={index}>{item[2]}</p>
        </div>
      );
    });

  


  return (
    <div className="Chat">
      <div className="chat-area">{allMessages}</div>
      <div className="input-section">
        <input
           type="text"
          placeholder="type here"
          onChange={(e) => {
            setmessageToBeSent(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
