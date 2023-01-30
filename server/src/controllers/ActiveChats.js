const db = require("../config/database")

const  getChats = (req,res)=>{


const {myUserId  } = req.params;



               

const query =  
              `(SELECT chatroom_id AS ID, chatroom_name AS name , last_updated , room
                FROM  (SELECT * FROM chatroom_users JOIN chatroom ON   
               fk_chat_room_chat_room_id = chatroom_id 
               WHERE fk_users_users_id = ? )  AS T
               UNION   
               SELECT  fk_friend_users_user_id,  user_name, last_updated,  room  FROM (SELECT * FROM friends JOIN users ON 
               fk_friend_users_user_id = user_id WHERE fk_me_users_user_id = ?) AS G) ORDER BY last_updated DESC`
                            



               db.query(query,[myUserId,myUserId],(err,result)=>{
                if(err){
                    res.send(err)
                }
        
                res.send(result)
            })               
                   




}


module.exports = {getChats}