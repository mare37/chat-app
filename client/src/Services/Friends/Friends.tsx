import axios from "axios"

const findIfFriend = async (myId:number, friendsId:number)=>{

    try{
        const response = await axios.get(`http://localhost:5000/api/friends/${myId}/${friendsId}`);

        //console.log(response.data);

        if(response.data.friendshipStatus){
            return true
        }else{
            return false
        }
        

    }catch(err){
        console.log(err);
        
    }


}


const getAllMyFriends = async (myId:number)=>{
    console.log(myId);
    

    try{
        const response = await axios.get(`http://localhost:5000/api/friends/${myId}`);

       // console.log(response.data);

      return response.data
        

    }catch(err){
        console.log(err);
        
    }

}



export {findIfFriend, getAllMyFriends}