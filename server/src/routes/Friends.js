const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");
var cookieParser = require('cookie-parser')

const { findIfFriend  } = require("../controllers/Friends");
const validate = require("../middleware/auth");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());
router.use(cookieParser());


router.get("/:myuserId/:friendUserId", findIfFriend);






module.exports = router;