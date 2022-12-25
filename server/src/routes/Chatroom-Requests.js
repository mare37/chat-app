const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {createChatRoomRequest ,getChatroomRequest, getChatRoomRequests,  acceptRequest } = require("../controllers/Chatroom-Requests");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", createChatRoomRequest);
router.get("/:userid/:chatroomId",getChatroomRequest);
router.get("/:chatroomId", getChatRoomRequests );
router.delete("/:userId/:chatroomId",  acceptRequest );



module.exports = router