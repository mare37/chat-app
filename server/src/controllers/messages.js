const db = require("../config/database")
const postOneMessage = (req, res)=>{

    const {message, chatroomId, userId} = req.body

    const query = `INSERT INTO messages (message_text,fk_users_user_id,fk_chat_room_chatroom_id)
                   VALUES (?,?,?)`

     db.query(query,[message,userId,chatroomId],(err, result)=>{
        if(err) throw err;

        console.log(result);
        res.send(result)
     })              
  

}

const getMessages = (req,res)=>{

     





}


module.exports = {postOneMessage}