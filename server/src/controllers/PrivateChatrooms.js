const db = require("../../src/config/database")


const getOnePrivateChatroom = (req,res)=>{

    const {myuserId,friendUserId} = req.params;

    const query = `SELECT * FROM private_chatrooms WHERE fk_member1_users_user_id = ? 
                   AND fk_member2_users_user_id = ?`

    db.query(query, [myuserId,friendUserId ], (err,result)=>{
        if(err){
            console.log(err);
        }
         
        if(result.length === 1){
            res.send(result)
        }else{

            db.query(query,[friendUserId,myuserId], (err,result)=>{
                if(err){
                    console.log(err);
                }
                res.send(result)
            })

        }
        
    })               


}



module.exports = {getOnePrivateChatroom}