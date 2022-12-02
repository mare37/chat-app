
const db = require("../config/database");

const createChatRoom = (req, res) => {
  const { chatroomName, category_id, user_id } = req.body;
  console.log(chatroomName);

  const query1 =
    "INSERT INTO chat_room (chatroom_name,fk_topic_categories_topic_category_id,fk_admin_users_user_id) VALUES (?,?,?)";

  const query2 = "INSERT INTO chat_roomusers (fk_chat_room_chat_room_id, fk_users_users_id ) VALUES (?,?)"

    db.query(query1, [chatroomName, category_id, user_id ], (err,response)=>{
        if(err){
            console.log(err);
            res.send("Failed");
            return
        }

        const result = response;
        //console.log(result.insertId);
        db.query(query2,[result.insertId, user_id  ],(err,response)=>{
            if(err){
                console.log(err);
                res.send("FAILED")
            }else{
                console.log(response);
                res.send("SUCCESS")
            }
        })
         
         


    })
    
};



const getAllChatRooms =(req,res)=>{

    const user_id = req.query.userId;

    if(user_id !== undefined){
        const query = "SELECT * FROM chat_room WHERE fk_admin_users_user_id = (?)"

        db.query(query,[user_id],(err,result)=>{
            if(err){
                console.log(err);
                res.send("FAILED")
                return
            }
    
            //console.log(result);
            res.send(result)
    
        })

    }else{
        const query = "SELECT *FROM chat_room";

        db.query(query,(err,result)=>{
            if(err){
                console.log(err);
                res.send("Failed")
                return
            }
            res.send(result)
        })

    }


   

}










module.exports = { createChatRoom, getAllChatRooms };
