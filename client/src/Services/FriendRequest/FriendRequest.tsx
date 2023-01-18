import axios from "axios";


const sendFriendRequest = async (myUserId:number, friendUserId:number)=>{

    console.log(myUserId);
    console.log(friendUserId);


    try{
        const response = await axios.post(`http://localhost:5000/api/friendrequests`, {
            myuserId:myUserId,
            friendUserId:friendUserId
        })

    }catch(err){
        console.log(err);
        

    }


}

const getFriendRequest = async (myUserId:number, friendUserId:number)=>{

    try{
        const response = await axios.get(`http://localhost:5000/api/friendrequests/${myUserId}/${friendUserId}`);
         
        //  console.log(response.data);
          
          return response.data

    }catch(err){
        console.log(err);
        

    }


}



const acceptFriendRequest = async (myUserId:number, friendUserId:number)=>{

    console.log(myUserId);
    console.log(friendUserId);

    try{
        const response = await axios.delete(`http://localhost:5000/api/friendrequests/${myUserId}/${friendUserId}/accept`)

    }catch(err){
        console.log(err);
        
    }

   

}


const rejectFriendRequest = async (myUserId:number, friendUserId:number)=>{

    console.log(myUserId);
    console.log(friendUserId);

    try{
        const response = await axios.delete(`http://localhost:5000/api/friendrequests/${myUserId}/${friendUserId}`)

    }catch(err){
        console.log(err);
        
    }

  

}





export {sendFriendRequest, getFriendRequest,rejectFriendRequest,  acceptFriendRequest  }