const db = require("../config/database");

const getAllMembers = (req, res) => {
  const id = req.params;
  // console.log(id );

  const query =
    "SELECT * FROM chat_roomusers WHERE fk_chat_room_chat_room_id = ?";

  db.query(query, [id.chatroomId], (err, result) => {
    if (err) {
      console.log(err);
      res.send("FAILED");
      return;
    }
    //console.log(result);
    res.send({ Message: "success", data: result });
  });
};


const  getJoinedChatrooms = (req,res)=>{

    const{userId} = req.params

    const query = `SELECT * FROM chat_roomusers JOIN chat_room ON   
                   fk_chat_room_chat_room_id = chatroom_id 
                   WHERE fk_users_users_id = ?`

    db.query(query,[userId],(err,result)=>{
        if(err){
            console.log(err);
        }

        res.send(result)
    })               





  



}



module.exports = { getAllMembers,    getJoinedChatrooms };
