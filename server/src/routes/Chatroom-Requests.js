const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {createChatRoomRequest ,getChatroomRequest, getChatRoomRequests } = require("../controllers/Chatroom-Requests");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", createChatRoomRequest);
router.get("/:userid/:chatroomId",getChatroomRequest);
router.get("/:chatroomId", getChatRoomRequests );


module.exports = router