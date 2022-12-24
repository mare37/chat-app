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

   
        
      
        
     
  /*     const response2 =  await axios.get("http://localhost:5000/api/chat_rooms", {
        params: { userId: userid },
      });

        console.log(response);
       // console.log(response.data.request)
        if(response.data.request === true){
          return true
        }else{
          return false
        } */
   
        
     

      

}







export { sendRequest, checkRequest };
