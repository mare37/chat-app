const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const {sendFriendRequest ,getFriendRequest } = require("../controllers/FriendRequests");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser());


router.post("/",sendFriendRequest);
router.get("/:myuserId/:friendUserId",getFriendRequest);






module.exports = router;