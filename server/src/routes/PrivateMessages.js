const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { postPrivateMessage, getAllPrivateMessages } = require("../controllers/PrivateMessages");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/",  postPrivateMessage);
router.get("/:privateChatroomId", getAllPrivateMessages);

//

module.exports =router;

