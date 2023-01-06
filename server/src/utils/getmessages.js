const { resolve } = require("path")
const db = require("../config/database")


async function getMessages(chatroomId,userId){
    console.log(`Chatroom no. ${chatroomId}`);
    console.log(`UserId: ${userId}`);

    
 
    const query = `SELECT * FROM messages JOIN users ON fk_users_user_id = user_id
                     JOIN chatroom ON fk_chat_room_chatroom_id = chatroom_id
                     WHERE fk_chat_room_chatroom_id = ? ORDER BY message_id`        

             

    const response = await new Promise((resolve, reject)=>{

        db.query(query,[chatroomId],(err,result)=>{
            if(err){
                reject(err);
            }
           // console.log(result);
            resolve(result)
        })
    })

 

    return response


}

module.exports = getMessages