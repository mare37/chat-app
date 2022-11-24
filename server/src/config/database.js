var mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chat_app",
  password: "Joyjenny007@",
});

db.connect( function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
})



module.exports = db


//const { response } = require("express");


