
const db = require("../../src/config/database");

const sendFriendRequest = (req, res) => {
  const { myuserId, friendUserId } = req.body;

  // console.log(myuserId);
  //   console.log( friendUserId);

  const query =
    "INSERT INTO friend_requests (fk_me_user_user_id,fk_friend_user_user_id) VALUES (?,?)";

  db.query(query, [myuserId, friendUserId], (err, result) => {
    if (err) {
      res.send({ friendrequestsent: false });
    }

    //  console.log(result);
    res.send({ friendrequestsent: true });
  });
};

const getFriendRequest = (req, res) => {
  const { myuserId, friendUserId } = req.params;

  const query2 =
    "SELECT * FROM  friend_requests WHERE fk_friend_user_user_id = ?";

  const query = `SELECT * FROM friend_requests WHERE fk_me_user_user_id = ? 
                    AND fk_friend_user_user_id = ?`;
    

    //select all people who have sent me a friend request
  db.query(query2, [myuserId], (err, result) => {
    if (err) {
      console.log(err);
    }
    //console.log(friendUserId);
    // console.log(result);
    //  console.log(friendUserId)

    let friend = parseInt(friendUserId);

   
    console.log(result);


    //Deals with empty array issue
    if (result.length === 0) {
       
      
     db.query(query, [myuserId, friendUserId], (err, result) => {
        if (err) {
          console.log(err);
        }
        //  console.log(result);

        if (result.length > 0) {
          res.send({ friendrequeststatus: true });
        } else {
          res.send({ friendrequeststatus: false });
        }
      });
    } 


     //If there people who have sent me a friend request loop to get the person i clicked
    for (i = 0; i < result.length; i++) {
      console.log(i);

      if (result[i].fk_me_user_user_id === friend) {
        console.log("Please respond to request");
        res.send({ respondToRequest: true , friendrequeststatus: null });
        break;
      }
      //end of loop
      //NO ONE IN THE LIST MATCHES WITH THE PERSON I CLICKED
      //WE ARE NOT FRIENDS AND HE HAS NOT SENT A REQUEST 
      if (i === result.length - 1) {
        console.log("AM HERE NOW");
    

        db.query(query, [myuserId, friendUserId], (err, result) => {
          if (err) {
            console.log(err);
          }
          //  console.log(result);

          if (result.length > 0) {
            res.send({ friendrequeststatus: true });
          } else {
            res.send({ friendrequeststatus: false });
          }
        });
      }
    }

    /*  const array = result.map((item)=>{
                               
                            if(item.fk_me_user_user_id === friend ){
                               console.log("Please respond to request");
                             // console.log(item);
                              return item
                           }
                          
                        })*/
    // console.log(array);
  });
};

const friendRequestSent = (req, res) => {};


const rejectFriendRequest = (req,res)=>{

    const {myuserId,friendUserId} = req.params

    console.log("REJECT FRIEND");

    const query = "DELETE FROM friend_requests WHERE fk_me_user_user_id = ? AND fk_friend_user_user_id = ?";

    db.query(query,[friendUserId,myuserId],(err,result)=>{
        if(err){
            console.log(err);
        }

        console.log(result);
    })
    

}


const acceptFriendRequest = (req,res)=>{

    const {myuserId,friendUserId} = req.params

    console.log("ACCEPT FRIEND");

    const query = "DELETE FROM friend_requests WHERE fk_me_user_user_id = ? AND fk_friend_user_user_id = ?";
    const query2 = "INSERT INTO friends (fk_me_users_user_id,fk_friend_users_user_id) VALUES (?,?)"

    db.query(query,[friendUserId,myuserId],(err,result)=>{
        if(err){
            console.log(err);
        }

       // console.log(result);
       const query2 = "INSERT INTO friends (fk_me_users_user_id,fk_friend_users_user_id) VALUES (?,?)"
       
       db.query(query2,[myuserId,friendUserId],(err,result)=>{
        if(err){
            console.log(err);
        }

        db.query(query2,[friendUserId, myuserId],(err,result)=>{
            if(err){
                console.log(err);
            }
    
            console.log(result);
    
            })

       

        })


    })
    

}

module.exports = { sendFriendRequest, getFriendRequest, rejectFriendRequest,  acceptFriendRequest };
