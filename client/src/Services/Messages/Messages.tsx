import axios from "axios";


const postOneMessage = async (message:string,chatroomId:number,userId:number)=>{
   // console.log(message);

 const response = await  axios.post("http://localhost:5000/api/messages", {
        message: message,
        chatroomId:chatroomId,
        userId:userId
    })

   // console.log(response);


}


const  getOneChatroomMessages = async (chatroomId:number)=>{

    const response = await axios.get(`http://localhost:5000/api/messages/${chatroomId}`)

    return response

}

export {postOneMessage,getOneChatroomMessages  }