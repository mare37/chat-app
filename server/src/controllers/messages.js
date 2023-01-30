const db = require("../config/database")
const postOneMessage = (req, res)=>{

    const {message, chatroomId, userId} = req.body

    const query = `INSERT INTO messages (message_text,fk_users_user_id,fk_chat_room_chatroom_id)
                   VALUES (?,?,?)`

     db.query(query,[message,userId,chatroomId],(err, result)=>{
        if(err) throw err;

     //   console.log(result);
       
        const lastUpdatedQuery = `UPDATE chatroom SET last_updated = NOW() 
                                      WHERE chatroom_id = ?`
       db.query(lastUpdatedQuery,[chatroomId],(err,result)=>{
         if(err){
            console.log(err);
         }
         console.log(result);
       })

        res.send(result)
     })              
  

}

const getMessages = (req,res)=>{


}


const getOneChatroomMessages = (req,res)=>{

   const {chatroomId} = req.params

   const query =  `SELECT * FROM messages JOIN users ON fk_users_user_id = user_id
                   JOIN chatroom ON fk_chat_room_chatroom_id = chatroom_id
                   WHERE fk_chat_room_chatroom_id = ? ORDER BY message_id`   

   db.query(query,[chatroomId],(err,result)=>{
      if(err) throw err

      res.send(result);
     
   })





  





}


module.exports = {postOneMessage,  getOneChatroomMessages  }