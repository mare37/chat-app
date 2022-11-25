var mysql = require("mysql2");
require("dotenv").config();



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chat_app",
  password: process.env.DATABASE_PASSWORD,
});

db.connect( function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + db.threadId);
})



module.exports = db