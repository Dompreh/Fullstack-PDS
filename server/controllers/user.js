const User = require("../models/User");

//delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json("User has been deleted successfully");
  } catch (err) {
    res.status(err);
  }
};

//update user
const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const editUser = await User.findById(id);
    if (!editUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's properties with the new data from the request body
    Object.assign(editUser, req.body);

    const updatedUser = await editUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err)
  }

};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  deleteUser,
  getAllUsers,
  updateUser
};
