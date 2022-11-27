const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { response } = require("express");
const validate =  require("./src/middleware/auth");

const db = require("./src/config/database")


app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
const port = 5000;

//importing routes
const usersRoute = require("./src/routes/users")

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http//localhost:3000"],
    methods: ["GET", "POST"],
  },
});


app.use(usersRoute)

app.get("/", validate, (req, res) => {
  
  //db
  // .query
  // "ALTER TABLE posts AUTO_INCREMENT = 1"
  //"INSERT INTO posts (title, blogposts, author) VALUES ('onee', 'two', 'three'  ) "
  //  ();

  res.send("HOME");
});

io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data, err) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    socket.join(data.room);
    socket.emit(
      "room_joined_sucessfully",
      `${data.firstName} you have joined room ${data.room}`
    );
  });

  socket.on("send_message", (data) => {
    console.log(data.messageToBeSent);
    console.log(data.authorFirstName);
    console.log(data.authorSecondName);
    socket.emit("received_message", [
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
      ]);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});



  httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });

