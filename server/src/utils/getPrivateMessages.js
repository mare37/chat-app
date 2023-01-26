const db = require("../config/database")


async function getPrivateMessages(privatechatroomId,userId){
   // console.log(`Chatroom no. ${chatroomId}`);
  //  console.log(`UserId: ${userId}`);

    
 
  query = `SELECT * FROM private_messages WHERE fk_private_chatrooms_id = ? ORDER BY private_messages_id`   

             

    const response = await new Promise((resolve, reject)=>{

        db.query(query,[privatechatroomId],(err,result)=>{
            if(err){
                reject(err);
            }
           // console.log(result);
         //  console.log(result);
            resolve(result)
        })
    })

 

    return response


}

module.exports = getPrivateMessages