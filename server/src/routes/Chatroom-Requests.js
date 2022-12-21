const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {createChatRoomRequest  } = require("../controllers/Chatroom-Requests");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", createChatRoomRequest)

module.exports = router