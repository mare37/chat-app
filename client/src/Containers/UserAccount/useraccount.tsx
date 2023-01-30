import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { SetsendRequest } from "../../Redux/Chatroom_Requests/SetRequestSlice";
import Chat from "../../Components/Chat/chat";
import "./useraccount.css";
import ChatRoomInfo from "./chatroomifo";

import * as React from "react";
import SendRequest from "../../Components/SendRequest/SendRequest";
import Welcome from "../../Components/WelcomeToChat/Welcome";
import PrivateMessage from "../../Components/PrivateMessage/PrivateMessage";
import SendFriendRequest from "../../Components/SendFriendRequest/SendFriendRequest";
import ChatroomComponent from "../../Components/ChatroomComponent/ChatroomComponent";
import FriendComponent from "../../Components/FriendComponent/FriendComponent";
//importing chatroom hooks
import {
  useGetUsersChatRooms,
  useGetSearchedChatRooms,
} from "../../Hooks/Chatrooms";

import { useGetFriends } from "../../Hooks/Friends";

import {useSearchedUsers} from "../../Hooks/Users"

import { useMyChatrooms } from "../../Hooks/ChatroomUsers";

import { SocketContext } from "../../context";

import { getChats } from "../../Services/ActiveChats/ActiveChats";



axios.defaults.withCredentials = true;




function UserAccount() {
  const socket = useContext(SocketContext)
  const { username } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.reducer.user.object);
  const singleChatroom = useSelector( (state: RootState) => state.reducer.singlechatroom.object);
  const friend = useSelector((state:RootState)=> state.reducer.SearchedFriend.object)

 

  //console.log(singleChatroom);

  //destructuring what is needed from  hooks
  const { getChatRoomInfo, getChatrooms, myChatRooms, oneChatRoom } =
    useGetUsersChatRooms()

  const {getFriends,  friends  } = useGetFriends();

  const { joinChatRoom,     getSeachedChartRooms, searchItems, setSearchItems } =
    useGetSearchedChatRooms();

  const { joinedChatrooms, joinedRooms,  joinAchatroom,  setJoinedRoomsData  }  = useMyChatrooms()

  const{ getSearchedUsers, searchedUsers, friendship,  setfriendship, connectWithFriend } = useSearchedUsers();

  //State
  const [createGroup, setCreateGroup] = useState(false);
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<boolean | null>(false);
  const [sendRequest, setsendRequest] = useState<boolean | null>(null);
  const[chatroomInfo, setChatRoomInfo] = useState(false);

  

  //Getting all my chat rooms in which this user account is the admin
  useEffect(() => {

    let  requestBooleanValue = {SendRequest : true}
      
    //dispatch(SetsendRequest(requestBooleanValue))

    getChatrooms(user.userid);
    getFriends(user.userid);
    joinedChatrooms();


  /*  const waitForData = async ()=>{
           const response = await getChats(user.userid);
    } */
   

  }, []);

  //console.log( myChatRooms);
  



  //Get  chat rooms that have been searched in the search bar
  useEffect(() => {
    if (query.length >= 1) {
      getSeachedChartRooms(query);
      getSearchedUsers(query);
    } else {
      setSearchItems([]);
    }
  }, [query]);

  useEffect(() => {
    setsendRequest(null)
    socket.on("room_joined_sucessfully", (data) => {
      //  console.log(data);
        const  requestBooleanValue = {SendRequest : data[1], message: data[0],currentRoom:data[2]}

        console.log( requestBooleanValue);
        
      
        dispatch(SetsendRequest(requestBooleanValue))
       
       setsendRequest(data[1])
      
     // setRoomMessage(data);
    });
  }, [socket]);


  useEffect(()=>{
    if(friendship || !friendship){
      setChatRoomInfo(false)
    }
    
  },[friendship])

 

  //wrapping list of users chatrooms in a html element,we give each element
  //an onClick function that will call getChatRooInfo function to highlight
  //one member when clicked
  let myChatRoomsData = myChatRooms.map((chatRoom, index) => {
    return (
      <p
        onClick={() => {
          // console.log(chatRoom.chatroom_id);
          setChat(false)
          getChatRoomInfo(chatRoom.chatroom_id);

          let  requestBooleanValue = {SendRequest : true}
      
       //  dispatch(SetsendRequest(requestBooleanValue))
          setsendRequest(null)
          setChat(true)
          setChatRoomInfo(true)
          setfriendship(null)
          //joinChatRoom(chatRoom.chatroom_id);
        
        }}
        key={index}
      >
        {chatRoom.chatroom_name}
      </p>
    );
  });

 // console.log(joinedRooms);
  

  const joinedRoomsdata = joinedRooms.map((item, index)=>{

        if(item.room === "public"){


          return <ChatroomComponent  
                      key={index}
                      ID={item.ID}
                      room={item.room}   
                      chatroomName={item.name}
                      joinAchatroom={joinAchatroom}
                      setChat={ setChat }
                      setChatRoomInfo={  setChatRoomInfo }
                      setfriendship={  setfriendship  }

                      />
       
          
        /*  return <p key={index} onClick={()=>{
            joinAchatroom(item.ID, item.room)
            setChat(true)
            setChatRoomInfo(false)
            setfriendship(null)
          }}>{item.name}</p>*/

        }else{
         // return <p key={index}>{item.name}</p>

         return <FriendComponent key={index}
                                 myUserId={user.userid}
                                 friendsUserName={item.name}
                                 friendsId={item.ID}
                                 setfriendship={setfriendship}
                                 connectWithFriend={connectWithFriend}

              />
        }
   
    
    
   
  })


  let friendsData = friends.map((item,index)=>{
  
    
    return <p key={index}>{item.user_name}</p>
  })

 

    let MidSectionComponent;

   if(friendship){
    //setChatRoomInfo(false)
    MidSectionComponent = <PrivateMessage/>

   }else if(friendship === false){

    MidSectionComponent = <SendFriendRequest  name={friend.user_name} 
                                  friendSId={friend.user_id}  myUserId={user.userid} />
   }else{
    //At this point friendship has been set to null to remove those 
    //components out of view
    if(sendRequest === false){
      MidSectionComponent =  <SendRequest/>
    }else{
            if(chat === false || null){

              MidSectionComponent = <Welcome/>
            }else{
              MidSectionComponent = <Chat username={user.username}
              chatroom_id={singleChatroom.chatroom_id}  />
            }

    }

   }

   

  


   








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
           ( query.length >= 1 || searchItems.length > 0
              ? "search-result-container" 
              : "search-result-container active") 
          }
        >
          {searchItems}
          {searchedUsers}
        </div>
      </div>
      <div className="friends"  >
        <p>My Connects</p>
      </div>


      <div className="useraccount-body">
        <section className="mygroups-section">
        <h3>ACTIVE CHATS</h3>

          {/*myChatRoomsData*/}


          {joinedRoomsdata}
          {/*friendsData*/}
      
        </section>
        <section className="chat-section">


        {MidSectionComponent}


        </section>
        {chatroomInfo?     <section className="chatroom-info">
          <ChatRoomInfo
            oneChatRoom={singleChatroom.chatroom_name}
            numberOfMembers={singleChatroom.chatroom_membersNo}
            numberOfRequests={singleChatroom.chatroom_requestNo}
          />

         
        </section>: ""}          
        
    
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
