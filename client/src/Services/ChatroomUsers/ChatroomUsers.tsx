import axios from "axios"

const getJoinedChatrooms = async (userId:number)=>{


     try{
        const response =  await axios.get(`http://localhost:5000/api/chatroom_users/${userId}/chatroomsjoined`)
      //  console.log(response);
        return response.data

        
     }catch(err){
        console.log(err);
        
     }

   


}

export {getJoinedChatrooms}