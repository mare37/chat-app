import { useEffect } from "react";
import { io ,Socket} from "socket.io-client";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useContext } from "react";
//import { SocketContext } from "../../context";

const socket = io("http://localhost:5000", { 
  transports: ["websocket"],
});


function PrivateMessage(){
 //const socket = useContext(SocketContext)
  const user = useSelector((state:RootState)=> state.reducer.user.object)
  const friend = useSelector((state:RootState)=> state.reducer.SearchedFriend.object)
  const privateChatroom = useSelector((state:RootState)=> state.reducer.PrivateChatroom.object.private_chatroom_id)






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



 const  onMessage = (content:any)=> {
  
      socket.emit("private message", {
        content,
        room:privateChatroom ,
        to: friend.user_id,
        me: user.userid
      });
    /*  this.selectedUser.messages.push({
        content,
        fromSelf: true,
      });*/
    }
  




  useEffect(()=>{

    const  privateChatroomID =  parseInt(""+ user.userid+friend.user_id);

    onLoad(user.username, privateChatroomID)




  },[privateChatroom])


  useEffect(()=>{
      // console.log("private mesage ran");
       
    socket.on("private message", (data) => {
      console.log("private mesage ran");
       //  console.log(content);
         //console.log(from);
         console.log(data);
         
         
         


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
        <div>{/*singleChatroom.chatroom_name*/}</div>
        <div className="chat-area">{/*allMessages*/}</div>
        <div className="input-section">
          <input
            id="message-input"
            type="text"
            placeholder="type here"
            onChange={(e) => {
             // setmessageToBeSent(e.target.value);
            }}
          />
          <button  onClick={()=>{onMessage("TEXT TEST")}}      >Send</button>
        </div>
      </div>
    )
}



export default PrivateMessage;