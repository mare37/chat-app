const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { postOneMessage, getOneChatroomMessages } = require("../controllers/messages");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.post("/", postOneMessage);
router.get("/:chatroomId", getOneChatroomMessages)




module.exports = router;

