const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { response } = require("express");

app.use(cors());
const port = 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http//localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

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
    console.log(data.author);
    socket.emit("received_message", data.messageToBeSent);
    socket.to(data.room).emit("received_message", data.messageToBeSent);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
