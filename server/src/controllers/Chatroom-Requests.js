const db = require("../config/database");

const createChatRoomRequest = (req,res)=>{

    const {  userid} = req.body
    const chatroomId = req.body.chatroomId
   console.log(userid)
   console.log( chatroomId)

   const query1 =
   "INSERT INTO chatroom_requests (fk_chat_room_chat_room_id,fk_users_users_id) VALUES (?,?)";

   db.query(query1,[chatroomId.chatroom_id,userid], (err,result)=>{
    if(err){
        console.log(err);
    }
    res.send( result)
   }
    

    
   )


  // console.log( chatroomId.chatroomId);
//  console.log(req.body);





  
}


const getChatroomRequest = (req,res)=>{
    console.log("yes");
    const {userid, chatroomId }= req.params
    console.log(userid);
    console.log(chatroomId)

    const query = "SELECT * FROM  chatroom_requests WHERE fk_chat_room_chat_room_id LIKE ? AND fk_users_users_id LIKE ?"

    db.query(query,[chatroomId,userid], (err,result)=>{
        if(err){
            console.log(err);
        }

        //console.log(result);
        if(result.length > 0){
            res.send({message:"REQUEST ALREADY SENT", request:true})
        }else{
            res.send({message:"REQUEST NOT SENT", request:false})
        }
    })

}





module.exports = {createChatRoomRequest, getChatroomRequest}