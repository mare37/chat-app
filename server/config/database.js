var mysql = require('mysql2');

const db =  mysql.createConnection({
    host:"localhost",
    user: "root",
    database:"chat_app",
    password: "Joyjenny007@"
})



  db.query('SELECT 1', function (error, results, fields) {
    if (error) throw error;
    console.log("Chat app Database connected successfully");
  })

  module.exports = db

