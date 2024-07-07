const express = require("express");
const { newParcel, getAllParcels, getUsersParcel, getOneParcel, updateParcel,  deleteParcel } = require("../controllers/parcel");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", verifyToken,newParcel)
router.get("/", verifyTokenAndAuthorization,getAllParcels)
router.get("/me", getUsersParcel)
router.get("/find/:id", getOneParcel) //GET ONE Parcel
router.put("/:id", updateParcel)
router.delete("/:id", deleteParcel)


module.exports = router