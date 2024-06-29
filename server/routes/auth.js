const express = require("express");
const router = express.router();
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//REGISTRATION
router.post("/register", async (req, res) => {
  const newUser = User({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    address: req.body.address,
    password: cryptojs.AES.encrypt(req.body.password, process.env.PASS).toString(),
    role: req.body.role,
    status: req.body.status,
  });

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
});

//LOGIN
router.post("/login",async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user){
          res.status(401).json("You have not registered")
        }

        const hashedPassword = cryptojs.AES.decrypt(req.body.password,process.env.PASS)

        const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8)

        if(originalPassword !== req.body.password){
          res.status(500).json("Wrong password")
        }

        const {password, ...info} = user._doc

        const accessToken = jwt.sign(
          {id:user._id,role:user.role},
          process.env.JWT_SEC,
          {expiresIn:"7d"}
        )

        res.status(200).json({...info, accessToken})

    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;
