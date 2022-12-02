import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function Chat(props : any) {
  const [message, setMessage] = useState([""]);
  const [messageToBeSent, setmessageToBeSent] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  

  socket.on("connect", () => {
    console.log("Server connected");
  });
  socket.on("disconnect", () => {
    console.log("Server disconnected");
  });


  const joinRoom = async () => {
    await socket.emit("join_room", {
      room: props.room,
      firstName: props.firstName,
      secondName: props.secondName,
    });
  };

  
  

  useEffect(() => {
    joinRoom();
  }, []);

  //join room
  

  //send message
  const sendMessage = async () => {
    if (messageToBeSent.length > 0) {
      await socket.emit("send_message", {
        room: props.room,
        messageToBeSent: messageToBeSent,
        authorFirstName: props.firstName,
        authorSecondName: props.secondName,
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
            props.firstName === item[0] && props.secondName === item[1]
              ? "text-message active"
              : "text-message"
          }
        >
          <p className={props.firstName === item[0] && props.secondName === item[1]
              ? "text-paragraph"
              : "text-paragraph active" }   key={index}>{item[2]}</p>
        </div>
      );
    });

  useEffect(() => {
    socket.on("room_joined_sucessfully", (data) => {
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
