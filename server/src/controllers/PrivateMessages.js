
const { query } = require("../config/database");
const db =  require("../config/database")


const postPrivateMessage = (req, res) => {
  const { message, myUserId, friendsUserId, privateChatroomId } = req.body;

  console.log(privateChatroomId);
  const query =  `INSERT INTO private_messages (private_message,fk_mymessage_users_user_id,
                  fk_tofriend_users_user_id,fk_private_chatrooms_id) VALUES (?,?,?,?)`

   db.query(query,[ message, myUserId, friendsUserId, privateChatroomId],(err,result)=>{
    if(err){
        console.log(err);
    }

    const lastUpdatedQuery = `UPDATE friends SET last_updated = NOW() 
    WHERE fk_me_users_user_id = ? AND fk_friend_users_user_id = ?`
      db.query(lastUpdatedQuery,[ myUserId, friendsUserId],(err,result)=>{
        if(err){
            console.log(err);
          }
          console.log(result);
         })
      
    res.send("ONE PRIVATE POST ADDED")
   // console.log(result);
   })              

  


};


const  getAllPrivateMessages = (req,res)=>{

  const {privateChatroomId } = req.params

  console.log("AM HERE NOW MAN");

  const query = `SELECT * FROM private_messages WHERE fk_private_chatrooms_id = ? ORDER BY private_messages_id` 
  
  db.query(query,[privateChatroomId], (err,result)=>{
    if(err){
      console.log(err);
    }

    res.send(result);
  })


}

module.exports = { postPrivateMessage, getAllPrivateMessages };
