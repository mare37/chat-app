const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { response } = require("express");
const db = require("./config/database")



app.use(cors());
app.use(express.json())
const port = 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http//localhost:3000"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
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
  console.log(`Socket io listening on port ${port}...`);
});

