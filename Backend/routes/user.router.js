const express = require('express')
const nodemailer = require("nodemailer")
const UserModel = require('../model/user.model')
const userrouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BlacklistModel } = require('../Google_Oauth/models/blacklist')

const sendVerificationMail = async (name, email, userId) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "anshita674@gmail.com",
          pass: "decehtqforbxpjza",
        },
      });
  
      const mailOptions = {
        from: "anshita674@gmail.com",
        to: email,
        subject: "For verification mail",
        html:` <p>Hi ${name}, please click here to <a href="http://localhost:8080/verify?id=${userId}">verify</a>your mail</p>`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

userrouter.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const userExist = await UserModel.findOne({ email });
  
      if (userExist) {
        return res.status(401).send({ msg: "User Already Registered" });
      }
  
      const hash = await bcrypt.hash(password, 8);
  
      const newUser = new UserModel({ name, email, password: hash });
  
      const userData = await newUser.save();
      if (userData) {
        sendVerificationMail(name, email, userData._id);
        res.status(200).json({ msg: "Registration successful", userData });
      } else {
        res.status(401).json({ msg: "Registration failed" });
      }
    } catch (error) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });
  

userrouter.post("/login",async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await UserModel.findOne({ email })
        if (data) {
            bcrypt.compare(password, data.password, function (err, result) {
                if (result) {
                    res.status(200).send({ "token": jwt.sign({ "userID": data._id }, 'marvel'), "userdetails": data })
                } else {
                    res.status(401).send({ "msg": "Wrong Credintials" })
                }

            });
        } else {
            res.status(401).send({ "msg": "User not found" })
        }
    } catch (error) {
        res.status(401).send({ "msg": error.message })
    }
})


userrouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers?.authorization;
      if (!token) return res.status(403);
      let blackListedToken = new BlacklistModel({token});
      await blackListedToken.save()
      res.send({ msg: "logout succesfull" });
    } catch (error) {
      res.send(error.message);
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
        isVerified:isUserPresent.isVerified
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



module.exports=userrouter