const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { registerUser, logIn } = require("../controllers/users");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser("1234"))


router.post("/api/register", registerUser);
router.post("/api/login", logIn)

module.exports = router;
