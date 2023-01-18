
const db = require("../../src/config/database");


const  findIfFriend = (req,res)=>{

    const{myuserId, friendUserId} = req.params;
    console.log( friendUserId);

    const query = "SELECT * FROM friends WHERE fk_me_users_user_id = ? AND fk_friend_users_user_id = ?"

    db.query(query,[myuserId,friendUserId],(err,result)=>{
        if(err) throw err

        if(result.length === 0){
            res.send({friendshipStatus: false})
        }else{
            res.send({friendshipStatus: true})

        }
    })

   

}


module.exports = {findIfFriend}