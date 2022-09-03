const express = require("express");
const { register } = require("../Controllers/auth");
const router = express.Router();

router.post("/register", register);
module.exports = router;
