const express = require("express");
const router = express.Router();
const db = require("../config/database");
const cors = require("cors");

const { registerUser } = require("../controllers/users");

router.use(cors({ origin: true, credentials: true }));
router.use(express.json());

router.get("/api/register", registerUser);

module.exports = router;
