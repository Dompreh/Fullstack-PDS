const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//register user

const registerUser = async (req, res) => {
  const { fullname, email, age, country, address, password, role, status } = req.body;

  try {
    // Check for duplicate fullname
    const duplicate = await User.findOne({ fullname })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate fullname" });
    }

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      age,
      country,
      address,
      password: cryptojs.AES.encrypt(password, process.env.PASS).toString(),
      role,
      status,
    });

    // Save the new user
    const user = await newUser.save();
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error);
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json("You have not registered");
    }

    const hashedPassword = cryptojs.AES.decrypt(
      user.password,
      process.env.PASS
    );

    const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(500).json("Wrong password");
    }

    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "7d" }
    );

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
