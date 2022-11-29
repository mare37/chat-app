import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

axios.defaults.withCredentials = true;

function UserAccount() {
  const { username } = useParams();

  interface Item {
    chatroom_id: 0;
    chatroom_name: "";
    fk_topic_categories_topic_category_id: 0;
    fk_admin_users_user_id: 0;
  }

  const userId = useSelector((state: RootState) => state.object.userid);
  const [createGroup, setCreateGroup] = useState(false);
  const [myChatRooms, setMyChatRooms] = useState<Array<Item>>([]);
  //const [ myChatRoomsData, setmyChatRoomsData] = useState([]);

  console.log(userId);

  useEffect(() => {
    //Getting all my chat rooms in which this user account is the admin
    axios
      .get("http://localhost:5000/api/chat_rooms", {
        params: { userId: userId },
      })
      .then((response) => {
        //console.log(response);
        setMyChatRooms(response.data);
        console.log(myChatRooms);
      })
      .then();
  }, []);

  let myChatRoomsData  = myChatRooms.map((chatRoom, index) => {
    console.log(chatRoom.chatroom_name);

    return <h1  onClick={()=>{console.log(chatRoom.chatroom_id);
    }}         key={index}>{chatRoom.chatroom_name}</h1>;
  });



  useEffect(() => {
    console.log("ran");
  
  }, [myChatRooms]);

  console.log("page rendering");

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

      {myChatRoomsData}
    </div>
  );
}

export default UserAccount;
