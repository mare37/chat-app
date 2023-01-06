const { resolve } = require("path")
const db = require("../config/database")

function addUser(userId, chatroomId){




    const query = `INSERT INTO chatroom_users (fk_chat_room_chat_room_id,fk_users_users_id) 
                   VALUES (?,?)`

    const response = new Promise((resolve,reject)=>{
        db.query(query,[chatroomId,userId], (err,result)=>{
            if(err){
                reject(err)
            }
           resolve(result)
        })                 

    })

   return response

 
    
  

}

module.exports = addUser