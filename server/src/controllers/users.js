const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const salt = 10;


const db = require("../config/database");

//register a user
const registerUser = (req, res) => {
  const { user_name, email, password } = req.body;

  const query1 = "SELECT * FROM users WHERE user_name = ?";
  const query2 = "SELECT * FROM users WHERE email = ?";
   
  //Find out if username exists
  db.query(query1,[user_name], (err,result)=>{
    if(err){
      console.log(err);
      res.send("Failed")
      return
    }
    
    if(result.length != 0){
      res.send("Username exists")
      return  //if it exists stop the registration
      
    }
     
    //Find out if email exists
    db.query(query2,[email],(err,result)=>{
      if(err){
        console.log(err);
        res.send("Failed")
        return
      }
      if(result.length != 0){
        res.send("Email exists")
        return  //if it exists stop the registration
      }

      //if both dont exist proceed with registration in the code below

      const query = "INSERT INTO users (email,user_name, password) VALUES (?,?,?)";

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          res.send("Failed");
          return;
        }
        db.query(query, [email, user_name, hash], (err, result) => {
          if (err) {
            console.log(err);
            res.send("FAILED");
            return;
          }
          res.send("SUCCESSFUL").status(200);
        });
      });


    })

  }  )
  

  
};

//user login

const logIn = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => { 
    if (err) {
      console.log(err);
      res.send("failed");
      return;
    }
    if (result.length === 0) {
      res.send("User doesnt exist");
      return;
    }

    const databasePassword = result[0].password;

    const match = await bcrypt.compare(password, databasePassword);

    if (match) {
      const token = jwt.sign(result[0], "1234", { expiresIn: 60 * 60 });
     // console.log(token);

      let options = {
        maxAge: 1000 * 60 * 15 * 10, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
       // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('access_token', token, options)
    console.log(result[0]);
    const user_name = result[0].user_name;
    const  user_id = result[0].user_id;
      res.send({auth:true,user_name:user_name,  user_id: user_id, message:"You are logged in"});
    } else {
      res.send({auth:false,message:"You are not logged in"});
    }
  });
};


const logOut = (req,res)=>{

  res.cookie('access_token', "", {maxAge:1,  httpOnly: true,secure:true  })
  res.send("Logged out")

}


const logInStatus = (req,res)=>{

 // console.log("You are logged in");

  res.send({login:true,message:"You are logged in"})

}

const getAllusers= (req,res)=>{


  const query = "SELECT * FROM users"

  db.query(query,(err,result)=>{
    if(err){
      console.log(err);
      return
    }
    res.send(result)
  })

  
}

module.exports = { registerUser, logIn, logOut, logInStatus,getAllusers   };
