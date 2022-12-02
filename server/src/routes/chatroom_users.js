const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const { getAllMembers } = require("../controllers/chatroom_users");

const validate = require("../middleware/auth");
const { route } = require("./chat_rooms");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser());

//Gets all members in a specific chatroom
router.get("/:chatroomId", getAllMembers);

module.exports = router;
