import { createContext } from "react";
import { io ,Socket} from "socket.io-client";


const socket = io("http://localhost:5000", { 
  transports: ["websocket"],
});

const SocketContext = createContext<Socket>(socket);




socket.on("connect", () => {
   
    console.log("Server connected");
  });
  socket.on("disconnect", () => {
    console.log("Server disconnected");
  });

export {SocketContext,socket}