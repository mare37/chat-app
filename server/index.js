const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { response } = require("express");
const validate =  require("./src/middleware/auth");
const JoinRoom = require("./src/utils/joinroom")
const getMessages = require("./src/utils/getmessages")

const db = require("./src/config/database")


app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
const port = 5000;

//importing routes
const usersRoute = require("./src/routes/users")
const categoriesRoute = require("./src/routes/topic_categories")
const chatroomRoute = require("./src/routes/chat_rooms")
const chatroomUsersRoute = require("./src/routes/chatroom_users");
const chatroomRequestRoute =  require("./src/routes/Chatroom-Requests")
const messagesRoute = require("./src/routes/messages")

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http//localhost:3000"],
    methods: ["GET", "POST"],
  },
});


app.use(usersRoute)
app.use("/api/topic_categories",categoriesRoute)
app.use("/api/chat_rooms", chatroomRoute);
app.use("/api/chatroom_users",  chatroomUsersRoute)
app.use("/api/chatroom_requests", chatroomRequestRoute );
app.use("/api/messages", messagesRoute);


app.get("/", validate, (req, res) => {
  
 

  res.send("HOME");
});

io.on("connection", (socket) => {
   console.log(`User connected ${socket.id}`);

  socket.on("join_room", async (data, err) => {
    if (err) {
      console.log(err);
    }

    //console.log(data.currentRoom);
    socket.leave(data.currentRoom)

   //console.log(data);
      
    //function returns a boolean
    const result = await JoinRoom(data.room, data.userId);
    console.log(result);

  /* socket.join(data.room);
    socket.emit(
      "room_joined_sucessfully",
     [`${data.firstName} you are not allowed to join room ${data.room}`]
    );  */


    if(result === true){
     // console.log(data)
      socket.join(data.room);
      let currentRoom = data.room
      socket.emit(
        "room_joined_sucessfully",
       [`${data.firstName} you have joined room ${data.room}`, true,  currentRoom]
      );   
    }
    if(result === false){
     // console.log(data);
     // socket.join(data.room);
     try{
      socket.emit(
        "room_joined_sucessfully",
       [`${data.firstName} you are not allowed to join room ${data.room}`,false]
      );   

     }catch(err){
      console.log(err);
     }
     

    }
  

   
  });

  socket.on("send_message", async (data) => {
    //console.log(data.messageToBeSent);
    console.log(data.authorFirstName);

    getMessages(data.room,data.userId).then((response)=>{
      console.log(response);
      console.log(response.length);

      socket.emit("received_message", response);
      socket.to(data.room).emit("received_message", response);




 /*     socket.emit("received_message", [
        data.authorFirstName,
        data.authorSecondName,
        data.messageToBeSent,
      ]);
      socket
        .to(data.room)
        .emit("received_message", [
          data.authorFirstName,
          data.authorSecondName,
          data.messageToBeSent,
        ]);*/

    })
  // console.log(response);
   
 
  });

  socket.on("disconnect", () => {

    
    console.log(`User disconnected ${socket.id}`);
   // socket.disconnect(true);
  });
});



  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });

