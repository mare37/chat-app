import { useEffect, useState, FC,useContext } from "react";
import * as React from "react";
import { io,Socket } from "socket.io-client";
import "./chat.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import  {SocketContext} from "../../context"


//const socket = io("http://localhost:5000", { 
 // transports: ["websocket"],
//});






   interface Props {
    username:string,
    chatroom_id: number
   }


function Chat ({username, chatroom_id}: Props )   {
  const socket = useContext(SocketContext)
  const singleChatroom = useSelector(
    (state: RootState) => state.reducer.singlechatroom.object
  );
  const user = useSelector((state: RootState) => state.reducer.user.object);




  const [message, setMessage] = useState([""]);
  const [messageToBeSent, setmessageToBeSent] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
 





 /* socket.on("connect", () => {
   
    console.log("Server connected");
  });
  socket.on("disconnect", () => {
    console.log("Server disconnected");
  });*/


  const joinRoom = async () => {
   // console.log("FUNCTION HAS BEEN CALLED");
    
    await socket.emit("join_room", { 
      room:  singleChatroom.chatroom_id,
      firstName: user.username,
      userId: user.userid
      
    });
   // console.log(`${username} You have joined ${singleChatroom.chatroom_id}`);
  };

  
  

  useEffect(() => {
   // setchatroomId(chatroom_id)
    joinRoom();
  }, [singleChatroom.chatroom_id]);

  //join room
  

  //send message
  const sendMessage = async () => {
    if (messageToBeSent.length > 0) {
      await socket.emit("send_message", {
        room: chatroom_id,
        messageToBeSent: messageToBeSent,
        authorFirstName: username,
        
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

    useEffect(() => {
      console.log("THIS RAN");
      
      socket.on("room_joined_sucessfully", (data) => {
        console.log(data);
        
        setRoomMessage(data);
      });
    }, [socket]);


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
