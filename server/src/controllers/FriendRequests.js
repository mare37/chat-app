const db = require("../../src/config/database")

const sendFriendRequest = (req,res)=>{

    const {myuserId, friendUserId} = req.body

    console.log(myuserId);
    console.log( friendUserId);

    const query = "INSERT INTO friend_requests (fk_me_user_user_id,fk_friend_user_user_id) VALUES (?,?)";

    db.query(query,[myuserId,friendUserId],(err,result)=>{
        if(err){
            res.send({friendrequestsent:false})
        }

      //  console.log(result);
      res.send({friendrequestsent:true})
    })

    


}


const getFriendRequest = (req,res)=>{

    const {myuserId, friendUserId} = req.params

    const query  = "SELECT * FROM friend_requests WHERE fk_me_user_user_id = ? AND fk_friend_user_user_id = ?";

    db.query(query,[myuserId,friendUserId],(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);

        if(result.length > 0){
            res.send({friendrequeststatus:true})
        }else{
            res.send({friendrequeststatus:false})
        }
    })

}



module.exports = {sendFriendRequest, getFriendRequest}