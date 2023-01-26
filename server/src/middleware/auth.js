var jwt = require("jsonwebtoken");



const validate= (req,res,next)=>{
    
    const token = req.cookies['access_token']
    //console.log(token);

    jwt.verify(token, '1234', function(err, decoded) {
        if(err){
           // res.send("You are not logged in");
           res.send({login:false,message:"You are not logged in"});
        }
        if(decoded === undefined){
            //console.log(("You are not log in"));
            res.send({login:false,message:"You are not logged in"});
        }else{
            next()
        }
        // err
        // decoded undefined
      });
       


}

module.exports = validate