
const db = require("../config/database");


const  getAllMembers =(req,res)=>{

    const id = req.params;
   // console.log(id );

   

    const query = "SELECT * FROM chat_roomusers WHERE fk_chat_room_chat_room_id = ?";

   
    db.query(query,[id.chatroomId],(err, result)=>{
     if(err){
         console.log(err);
         res.send("FAILED")
         return
     }
     //console.log(result);
     res.send({Message:"success", data:result})
 })

    

 
  


}


module.exports = {getAllMembers}