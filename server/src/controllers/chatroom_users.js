
const db = require("../config/database");


const  getAllMembers =(req,res)=>{

    const {id} = req.params;

 /*   const query = "SELECT * FROM chatroom_users WHERE fk_chat_room_chat_room_id = ?";

   
   db.query(query,[id],(err, result)=>{
    if(err){
        console.log(err);
        res.send("FAILED")
        return
    }
    console.log(result);
   // res.send("SUCCESS")
})*/
  


}


module.exports = {getAllMembers}