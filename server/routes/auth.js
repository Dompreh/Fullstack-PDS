const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth");

//REGISTRATION
router.post("/register", registerUser);

//LOGIN
router.post("/login", loginUser);

module.exports = router;
