const db = require("../config/database");
const addUser = require("../utils/addUser");

const createChatRoomRequest = (req,res)=>{

    const {  userid} = req.body
    const chatroomId = req.body.chatroomId
   console.log(userid)
   console.log( chatroomId)

   const query1 =
   "INSERT INTO chatroom_requests (fk_chat_room_chat_room_id,fk_users_users_id) VALUES (?,?)";

   db.query(query1,[chatroomId,userid], (err,result)=>{
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


//for a specific group
const  getChatRoomRequests = (req,res)=>{

    const {chatroomId  } =req.params;
     
   // const query = "SELECT * FROM chatroom_requests WHERE fk_chat_room_chat_room_id = ?"
   const query = `SELECT * FROM chatroom_requests JOIN users on fk_users_users_id = user_id 
                  WHERE fk_chat_room_chat_room_id = ?`

    db.query(query,[chatroomId],(err,result)=>{
        if(err){
            console.log(err);
            res.send("Failed")
        }
        res.send(result)
       
    })
   
   
   
    

}


const acceptRequest = (req, res)=>{

    const {userId, chatroomId } = req.params;

    const query = `DELETE FROM chatroom_requests WHERE fk_chat_room_chat_room_id = ? 
                   AND fk_users_users_id = ?`

    db.query(query, [chatroomId, userId], async (err, result)=>{
        if(err){
            console.log(err);
        }

      
        if (result) {
            const response = await addUser( userId, chatroomId)
            res.send(response)
        }
      
    })               
      


   
   

}



const  rejectRequest = (req,res)=>{

    const {userId, chatroomId } = req.params;

    const query = `DELETE FROM chatroom_requests WHERE fk_chat_room_chat_room_id = ? 
                   AND fk_users_users_id = ?`

    db.query(query, [chatroomId, userId], async (err, result)=>{
        if(err){
            console.log(err);
        }

        res.send(result)
      
    })               

}





module.exports = {createChatRoomRequest, getChatroomRequest, getChatRoomRequests , acceptRequest,  rejectRequest  }