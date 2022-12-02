import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import Chat from "../Chat/chat";
import "./useraccount.css";
import ChatRoomInfo from "./chatroomifo";

axios.defaults.withCredentials = true;

function UserAccount() {
  const { username } = useParams();

  interface Item {
    chatroom_id: 0;
    chatroom_name: "";
    fk_topic_categories_topic_category_id: 0;
    fk_admin_users_user_id: 0;
  }
  //chatroom_membersNo: "",
  const userId = useSelector((state: RootState) => state.object.userid);
  const [createGroup, setCreateGroup] = useState(false);
  const [myChatRooms, setMyChatRooms] = useState<Array<Item>>([]);
  const [query, setQuery] = useState("");
  const [searchItems, setSearchItems] = useState([]);
  const [requestToJoin, setRequestToJoin] = useState(false);
  const [oneChatRoom, setoneChatRoom] = useState({
    chatroom_name: "",
    chatroom_membersNo: 0
  });

  //Getting all my chat rooms in which this user account is the admin
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat_rooms", {
        params: { userId: userId },
      })
      .then((response) => {
        setMyChatRooms(response.data);
      });
  }, []);

 // console.log(myChatRooms);

  //Get all chat rooms
  useEffect(() => {
    console.log("USE EFFECT 2 RAN");

    if (query.length >= 1) {
      axios.get("http://localhost:5000/api/chat_rooms").then((response) => {
        let data = response.data.filter((item: any) => {
          return item.chatroom_name.toLowerCase().includes(query);
        });

        let data2 = data.map((item: any, key: number) => {
          return <p key={key}>{item.chatroom_name}</p>;
        });

        setSearchItems(data2);
      });
    } else {
      // let data3 = "";
      setSearchItems([]);
    }
  }, [query]);

  const getChatRoomInfo = (id: number) => {
    const oneChatRoom = myChatRooms.filter((item) => {
      if (item.chatroom_id === id) {
        return true;
      } else {
        return false;
      }
    });

  //  let arrayLength = 0;

    axios
    .get(`http://localhost:5000/api/chatroom_users/${id}`).then((response)=>{
      console.log (response.data.data.length);
      
     const arrayLength = response.data.data.length;

     setoneChatRoom({
      chatroom_name: oneChatRoom[0].chatroom_name,
      chatroom_membersNo: arrayLength,
    });
      
    })

     



    
    console.log(oneChatRoom);
  };

  let myChatRoomsData = myChatRooms.map((chatRoom, index) => {
    return (
      <h3
        onClick={() => {
          console.log(chatRoom.chatroom_id);
          getChatRoomInfo(chatRoom.chatroom_id);
        }}
        key={index}
      >
        {chatRoom.chatroom_name}
      </h3>
    );
  });

  return (
    <div>
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
          <Chat />
        </section>
        <section className="chatroom-info">
          <ChatRoomInfo oneChatRoom={oneChatRoom.chatroom_name} numberOfMembers={oneChatRoom.chatroom_membersNo} />
        </section>
      </div>
    </div>
  );
}

export default UserAccount;
