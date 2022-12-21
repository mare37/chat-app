import axios from "axios";

const sendRequest = async (userid: number, chatroomId: number) => {

  try{
    const response = await axios.post(
        "http://localhost:5000/api/chatroom_requests",
        {
            userid,
            chatroomId
        }
      );


      console.log(response)
      
  }catch(err){
    console.log(err);
    
  }


 

  
  
};

export { sendRequest };
