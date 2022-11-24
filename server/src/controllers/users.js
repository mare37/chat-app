const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = require("../config/database")



const registerUser = (req, res) => {


 
   
    console.log(req.body.name);



    res.send("RECEIVED")
    

};

module.exports = { registerUser };
