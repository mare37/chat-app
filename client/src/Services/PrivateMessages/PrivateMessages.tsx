import axios from "axios";

const postPrivateMessage = async (
  message: string,
  myUserId: number,
  friendsUserId: number,
  privateChatroomId: number
) => {


 const response =  await axios.post("http://localhost:5000/api/private_messages",{
        message,
        myUserId,
        friendsUserId,
        privateChatroomId
    })

    console.log(response);
    

};


const getAllPrivateMessages = async ( privateChatroomId: number)=>{

  console.log(privateChatroomId);
  

  const response = await axios.get(`http://localhost:5000/api/private_messages/${privateChatroomId}`);

// console.log(response);

  return response
  



}




export { postPrivateMessage, getAllPrivateMessages };
