const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const salt = 10;


const db = require("../config/database");

//register a user
const registerUser = (req, res) => {
  const { user_name, email, password } = req.body;

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
      console.log(token);

      let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    // Set cookie
    res.cookie('access_token', token, options)

      res.send("You Logged in");
    } else {
      res.send("Wrong password");
    }
  });
};

module.exports = { registerUser, logIn };
