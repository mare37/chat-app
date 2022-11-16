import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function Chat(props: any) {
  const [message, setMessage] = useState([""]);
  const [messageToBeSent, setmessageToBeSent] = useState("");

  const [room, setRoom] = useState(0);
  const [roomMessage, setRoomMessage] = useState("");
 // const [firstName, setFirstName] = useState("");
 // const [secondName, setSecondName] = useState("");

  socket.on("connect", () => {
    console.log("Server connected");
  });
  socket.on("disconnect", () => {
    console.log("Server disconnected");
  });


  

  //join room
  const joinRoom = async () => {
    await socket.emit("join_room", {
      room: props.room,
      firstName: props.firstName,
      secondName: props.secondName,
    });
  };

  useEffect(()=>{
    joinRoom();
  },[])

 

  //send message
  const sendMessage = async () => {
    if (messageToBeSent.length > 0) {
      await socket.emit("send_message", {
        room: props.room,
        messageToBeSent: messageToBeSent,
        author: `${props.firstName} ${props.secondName}`
      
      });
    } else {
      console.log("You havent typed anything");
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log(data);

      setMessage((prev) => {
        //  if(message.length === 0){
        // return [data]
        //   }
        return [...prev, data];
      });
    });
  }, [socket]);

  const allMessages: any = message.slice(0).reverse().map((item, index) => {
    return <p key={index}>{item}</p>;
  });

  useEffect(() => {
    socket.on("room_joined_sucessfully", (data) => {
      setRoomMessage(data);
    });
  }, [socket]);

  return (
    <div className="Chat">
      <div className="chat-area">{allMessages}</div>
      <div  className="input-section"     >
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
