const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {getOnePrivateChatroom } = require("../controllers/PrivateChatrooms");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser())



router.get("/:myuserId/:friendUserId", getOnePrivateChatroom);

//

module.exports =router;

