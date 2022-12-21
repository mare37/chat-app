import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Chat from "../../Components/Chat/chat";
import "./useraccount.css";
import ChatRoomInfo from "./chatroomifo";
import * as React from "react";
import SendRequest from "../../Components/SendRequest/SendRequest";
import Welcome from "../../Components/WelcomeToChat/Welcome";
//importing chatroom hooks
import {
  useGetUsersChatRooms,
  useGetSearchedChatRooms,
} from "../../Hooks/Chatrooms";
import { SocketContext } from "../../context";

axios.defaults.withCredentials = true;




function UserAccount() {
  const socket = useContext(SocketContext)
  const { username } = useParams();
  const user = useSelector(
    (state: RootState) => state.reducer.user.object
  );
  const singleChatroom = useSelector(
    (state: RootState) => state.reducer.singlechatroom.object
  );
  //console.log(singleChatroom);

  //destructuring what is needed from chat room hooks
  const { getChatRoomInfo, getChatrooms, myChatRooms, oneChatRoom } =
    useGetUsersChatRooms();

  const { joinChatRoom,     getSeachedChartRooms, searchItems, setSearchItems } =
    useGetSearchedChatRooms();

  const [createGroup, setCreateGroup] = useState(false);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState(false);
  const [sendRequest, setsendRequest] = useState(true);



  //Getting all my chat rooms in which this user account is the admin
  useEffect(() => {
    getChatrooms(user.userid);
  }, []);



  //Get  chat rooms that have been searched in the search bar
  useEffect(() => {
    if (query.length >= 1) {
      getSeachedChartRooms(query);
    } else {
      setSearchItems([]);
    }
  }, [query]);

  useEffect(() => {
      
    socket.on("room_joined_sucessfully", (data) => {
        console.log(data);
        setsendRequest(data[1])
      
     // setRoomMessage(data);
    });
  }, [socket]);

 

  //wrapping list of users chatrooms in a html element,we give each element
  //an onClick function that will call getChatRooInfo function to highlight
  //one member when clicked
  let myChatRoomsData = myChatRooms.map((chatRoom, index) => {
    return (
      <h3
        onClick={() => {
          // console.log(chatRoom.chatroom_id);
         
          getChatRoomInfo(chatRoom.chatroom_id);
          setsendRequest(true)
          setChat(true)
          
          //joinChatRoom(chatRoom.chatroom_id);
        
        }}
        key={index}
      >
        {chatRoom.chatroom_name}
      </h3>
    );
  });

  return (
    <div onClick={()=>{setQuery("")}}>
      <div>{`WELCOME ${username}`}</div>

      <button
        onClick={() => {
          setCreateGroup(true);
        }}
      >
        Create Chatroom
      </button>

      {createGroup === true ? (
        <form>
          <input />
          <button>Create</button>
        </form>
      ) : (
        ""
      )}

      <div className="search-container">
        <input
          type={"text"}
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value.toLowerCase());
            console.log(query);
          }}
        />

        <div
          className={
            query.length >= 1
              ? "search-result-container" 
              : "search-result-container active"
          }
        >
          {searchItems}
        </div>
      </div>

      <div className="useraccount-body">
        <section className="mygroups-section">
          <h1>My chat rooms</h1>

          {myChatRoomsData}
        </section>
        <section className="chat-section">

        {  !sendRequest? <SendRequest/> : ( chat?  <Chat username={user.username}
                chatroom_id={singleChatroom.chatroom_id}
                
           />: <Welcome/>)}


        </section>
        <section className="chatroom-info">
          <ChatRoomInfo
            oneChatRoom={singleChatroom.chatroom_name}
            numberOfMembers={singleChatroom.chatroom_membersNo}
          />
        </section>
      </div>
    </div>
  );
}

export default UserAccount;

/*interface Item {
  chatroom_id: 0;
  chatroom_name: "";
  fk_topic_categories_topic_category_id: 0;
  fk_admin_users_user_id: 0;
}*/