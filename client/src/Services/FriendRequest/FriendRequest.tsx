import axios from "axios";


const sendFriendRequest = async (myUserId:number, friendUserId:number)=>{

    console.log(myUserId);
    console.log(friendUserId);

    const response = await axios.post(`http://localhost:5000/api/friendrequests`, {
        myuserId:myUserId,
        friendUserId:friendUserId
    })


    


}

const getFriendRequest = async (myUserId:number, friendUserId:number)=>{

    const response = await axios.get(`http://localhost:5000/api/friendrequests/${myUserId}/${friendUserId}`);

    return response.data.friendrequeststatus


}





export {sendFriendRequest, getFriendRequest}