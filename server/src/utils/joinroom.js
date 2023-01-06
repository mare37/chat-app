
const db = require("../config/database")


async function JoinRoom(roomId, userId){
   // console.log(userId);
    const query = "SELECT * FROM  chatroom_users WHERE fk_chat_room_chat_room_id LIKE ? AND fk_users_users_id LIKE ?"


    const response =  await new Promise((resolve,reject)=>{
        db.query(query,[roomId, userId],  (err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
    
            //console.log(result);        
        })

    })
    if(response.length > 0){
       // console.log(response.length);
        return  true;
   }else{
       return false;
   }
    
      
  
   
}


module.exports = JoinRoom;