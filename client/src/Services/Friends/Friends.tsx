import axios from "axios"

const findFriend = async (myId:number, friendsId:number)=>{

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



export {findFriend}