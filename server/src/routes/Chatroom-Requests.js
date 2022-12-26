const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {createChatRoomRequest ,getChatroomRequest, getChatRoomRequests,  acceptRequest, rejectRequest } = require("../controllers/Chatroom-Requests");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", createChatRoomRequest);
router.get("/:userid/:chatroomId",getChatroomRequest);
router.get("/:chatroomId", getChatRoomRequests );
router.delete("/:userId/:chatroomId",  acceptRequest );
router.delete("/:userId/:chatroomId/reject",  rejectRequest );


module.exports = router