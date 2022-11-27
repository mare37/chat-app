const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { registerUser, logIn, logOut } = require("../controllers/users");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())


router.post("/api/register", registerUser);
router.post("/api/login", logIn)
router.get("/api/logout", logOut)

module.exports = router;
