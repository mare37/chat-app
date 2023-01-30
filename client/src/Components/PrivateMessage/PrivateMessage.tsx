import { useEffect ,useState} from "react";
import { io ,Socket} from "socket.io-client";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { postPrivateMessage, getAllPrivateMessages } from "../../Services/PrivateMessages/PrivateMessages";
//import { SocketContext } from "../../context";

const socket = io("http://localhost:5000", { 
  transports: ["websocket"],
});





interface Item {
  fk_mymessage_users_user_id: 0,
  fk_private_chatrooms_id: 0,
  fk_tofriend_users_user_id: 0,
  private_message: "",
  private_messages_id: 0
}


function PrivateMessage(){
 //const socket = useContext(SocketContext)
  const user = useSelector((state:RootState)=> state.reducer.user.object)
  const friend = useSelector((state:RootState)=> state.reducer.SearchedFriend.object)
  const privateChatroom = useSelector((state:RootState)=> state.reducer.PrivateChatroom.object.private_chatroom_id)
  const [privatemessages, setPrivateMessages] = useState<Array<Item>>([]);
  const [messageToBeSent, setmessageToBeSent] = useState<string>("");




  const onLoad = async (username: string, privateChatroomID:number) => {

    console.log( privateChatroom);

    socket.emit(`Private User connected`, { private:  "private",  privateChatroom})

 /*   socket.on("private connection", () => {
   
      console.log("Private user connected");

      
    });
    socket.on("disconnect", () => {
      console.log("Private user disconnected");
    });*/





  /*  await socket.emit("join private room", {
      room: privateChatroom,
     // firstName: user.username,
    //  userId: user.userid,
    //  currentRoom: currentroom,
    });*/
    
    
   // socket.auth = { privateChatroomID };
   // socket.connect();
  }



 const  onMessage = ()=> {

  if(messageToBeSent.length > 0){

    postPrivateMessage(messageToBeSent,user.userid,friend.user_id,privateChatroom).then(()=>{

      socket.emit("private message", {
        messageToBeSent,
        room:privateChatroom ,
        to: friend.user_id,
        me: user.userid
      });
     }
  
     )
    
  }else{
    console.log("You havent typed anything");
    
  }

 
  
    
    /*  this.selectedUser.messages.push({
        content,
        fromSelf: true,
      });*/
    }


    useEffect(() => {
      setPrivateMessages([]);
      console.log("Chat rendered");
  
      const waitForData = async () => {
        try {
          const response = await  getAllPrivateMessages(privateChatroom);

          console.log(response);
          

          setPrivateMessages(response.data);
              /*    console.log(response);
          joinRoom(currentRoom);*/
        } catch (err) {
          console.log(err);
        }
      };
  
      waitForData();
    }, [privateChatroom]);
  




  useEffect(()=>{

    const  privateChatroomID =  parseInt(""+ user.userid+friend.user_id);

    onLoad(user.username, privateChatroomID)




  },[privateChatroom])


  useEffect(()=>{

      // console.log("private mesage ran");
       
    socket.on("receive private message", (data) => {
      console.log("private mesage ran");
       //  console.log(content);
         //console.log(from);
         console.log(data[0]);
         setPrivateMessages(data[0])
       
         
         
         
         


  /*    for (let i = 0; i < this.users.length; i++) {
        const user = this.users[i];
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }
          break;
        }
      }*/
    });

  },[socket])

 // console.log(privatemessages);
  let allMessages: any;
  

  allMessages = privatemessages
  .slice(0)
  .reverse()
  .map((item: any, index: number) => {
   // console.log(item);
    
    return (
      <div
        key={index}
        className={
          user.userid === item.fk_mymessage_users_user_id ? "text-message active" : "text-message"
        }
      >
        <div
          className={
            user.userid === item.fk_mymessage_users_user_id
              ? "text-paragraph"
              : "text-paragraph active"
          }
          key={index}
        >
          
         <p>{item.user_name}  </p>
     <p>{item.private_message}</p>
     </div>
  </div>
  );
  });















  useEffect(()=>{

    socket.on("users", (users) => {
       console.log(users);
       


   //   users.forEach((user:any) => {
       // user.self = user.userID === socket.id;
       // initReactiveProperties(user);
    //  });
   /*   this.users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });*/
    });

  },[socket])

  



    return(
        <div className="Chat">
        <div>{friend.user_name}</div>
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
          <button  onClick={onMessage}>Send</button>
        </div>
      </div>
    )
}



export default PrivateMessage;