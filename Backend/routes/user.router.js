const express = require('express')
const UserModel = require('../model/user.model')
const userrouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userrouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(401).send({ msg: "User Already Registered" });
    }

    const hash = await bcrypt.hash(password, 8);

    const newUser = new UserModel({ name, email, password: hash, role });

    const userData = await newUser.save();
    if (userData) {
      res.status(200).json({ msg: "Registration successful", userData });
    } else {
      res.status(401).json({ msg: "Registration failed" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});



userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent) {
      return res.status(401).send("user not found");
    }
    const isPass = await bcrypt.compare(password, isUserPresent.password);
    if (!isPass) {
      return res.status(401).send({ msg: "invalid credential" });
    }
    const token = await jwt.sign(
      {
        userId: isUserPresent._id,
      },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    res.send({
      msg: "login success",
      token,
      username: isUserPresent.name,
      userId: isUserPresent._id,
      role: isUserPresent.role
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});





userrouter.get("/logout", async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(403);
    let blackListedToken = new BlackListModel({ token });
    await blackListedToken.save();
    res.send({ msg: "logout succesfull" });
  } catch (error) {
    res.send(error.message);
  }
});



userrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  const deleteUsers = await UserModel.findByIdAndDelete({ _id: id })
  return res.status(200).send({ msg: "User Deleted" })
})




module.exports = userrouter