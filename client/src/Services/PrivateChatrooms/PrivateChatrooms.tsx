import axios from "axios"


const getOnePrivateChatroom = async (myuserId:number, friendUserId:number)=>{

    const response = await axios.get(`http://localhost:5000/api/private_chatroom/${myuserId}/${friendUserId}`)

   // console.log(response.data);

    return response.data
    



}




export {getOnePrivateChatroom}