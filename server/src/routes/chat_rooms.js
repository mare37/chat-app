const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {createChatRoom, getAllChatRooms  } = require("../controllers/chat_rooms");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", createChatRoom)
router.get("/", getAllChatRooms )
//

module.exports =router;

