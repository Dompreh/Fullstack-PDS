const express = require("express");
const { deleteUser, getAllUsers } = require("../controllers/user");
const { verifyTokenAndAuthorization, verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

//DELETE USER
router.delete("/:id", verifyToken, deleteUser)

//GET ALL USERS
router.get("/",verifyTokenAndAuthorization, getAllUsers)

module.exports = router