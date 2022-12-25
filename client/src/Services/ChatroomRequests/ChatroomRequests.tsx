import axios from "axios";

const sendRequest = async (userid: number, chatroomId: number) => {
                   console.log(chatroomId);
                   
  try{
    const response = await axios.post(
        "http://localhost:5000/api/chatroom_requests",
        {
            userid,
            chatroomId
        }
      );


    //  console.log(response)
      
  }catch(err){
    console.log(err)
    
  }
  
};


//Check if request already sent
const checkRequest = async (userid: number, chatroomId: number)=>{
    console.log("Check request ran");
    console.log(userid);
    
    

    
        const response =  await new Promise((resolve,reject)=>{

          try{
            const response =  axios.get(`http://localhost:5000/api/chatroom_requests/${userid}/${chatroomId}`).then((object)=>{
                 console.log(object.data.request);
                 resolve(object.data.request);
            })
           

           
          }catch(err){
            if (typeof err === 'object' && err !== null) {
              
              console.log(err.toString());
              reject(err)
            } else {
              console.log('Unexpected error', err);
            }
          

          }
      


        })
        return response
}



const getChatRoomRequests = async (chatroomId:number)=>{

 

  const response = await axios.get(`http://localhost:5000/api/chatroom_requests/${chatroomId}`);
  //console.log(response);
  

 // console.log(response.data)

  return response.data;

}



const acceptRequest = async (userId:number, chatroomId:number)=>{

     //  console.log(username);
       console.log(chatroomId);

        const response =  await axios.delete(`http://localhost:5000/api/chatroom_requests/${userId}/${chatroomId}` );

        console.log(response);
        


       
       

}






export { sendRequest, checkRequest,getChatRoomRequests, acceptRequest };
