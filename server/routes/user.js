const express = require("express");
const { deleteUser, getAllUsers, updateUser } = require("../controllers/user");
const { verifyTokenAndAuthorization, verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

//DELETE USER
router.delete("/:id",verifyToken, deleteUser)

//UPDATE USER
router.put("/:id", updateUser)
//GET ALL USERS
router.get("/", verifyTokenAndAuthorization, getAllUsers)

module.exports = router