import { useEffect, useState, FC, useContext, useRef } from "react";
import * as React from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SocketContext } from "../../context";
import {
  postOneMessage,
  getOneChatroomMessages,
} from "../../Services/Messages/Messages";

interface Props {
  username: string;
  chatroom_id: number;
}

function Chat({ username, chatroom_id }: Props) {
  const socket = useContext(SocketContext);
  const inputRef = useRef(null);

  const singleChatroom = useSelector(
    (state: RootState) => state.reducer.singlechatroom.object
  );
  const user = useSelector((state: RootState) => state.reducer.user.object);
  const currentRoom = useSelector(
    (state: RootState) => state.reducer.sendRequest.object.currentRoom
  );

  const [message, setMessage] = useState<string[]>([]);
  const [messageToBeSent, setmessageToBeSent] = useState<string>("");

  const [roomMessage, setRoomMessage] = useState<string>("");

  const joinRoom = async (currentroom: number) => {
    await socket.emit("join_room", {
      room: singleChatroom.chatroom_id,
      firstName: user.username,
      userId: user.userid,
      currentRoom: currentroom,
    });
  };

  useEffect(() => {
    setMessage([""]);
    console.log("Chat rendered");

    const waitForData = async () => {
      try {
        const response = await getOneChatroomMessages(
          singleChatroom.chatroom_id
        );
        setMessage(response.data);
        console.log(response);
        joinRoom(currentRoom);
      } catch (err) {
        console.log(err);
      }
    };

    waitForData();
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
    console.log("sendmessage called");
    setMessage([""]);

    if (messageToBeSent.length > 0) {
      postOneMessage(
        messageToBeSent,
        singleChatroom.chatroom_id,
        user.userid
      ).then(() => {
        socket.emit("send_message", {
          room: singleChatroom.chatroom_id,
          messageToBeSent: messageToBeSent,
          authorFirstName: user.username,
          userId: user.userid,
        });
      });

      // setmessageToBeSent(inputRef.current);

      const messageInputElement = document.getElementById("message-input");
      if (messageInputElement) {
        // messageInputElement.innerText = "kenya"

        console.log(messageInputElement);
      }
    } else {
      console.log("You havent typed anything");
    }
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
        console.log(data);

      setMessage(data);

      /*  setMessage((prev) => {
        return [...prev, data];
      });*/
    });
  }, [socket]);

  // console.log(message);

  let allMessages: any;
  
  

  allMessages = message
    .slice(0)
    .reverse()
    .map((item: any, index: number) => {
      console.log(item);
      
      return (
        <div
          key={index}
          className={
            username === item.user_name ? "text-message active" : "text-message"
          }
        >
          <div
            className={
              username === item.user_name
                ? "text-paragraph"
                : "text-paragraph active"
            }
            key={index}
          >
            
            <p>{item.user_name} {item.fk_admin_users_user_id === item.user_id? "Admin": ""} </p>
            <p>{item.message_text}</p>
          </div>
        </div>
      );
    });

  return (
    <div className="Chat">
      <div>{singleChatroom.chatroom_name}</div>
      <div className="chat-area">{allMessages}</div>
      <div className="input-section">
        <input
          id="message-input"
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
