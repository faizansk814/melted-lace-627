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
    const { name, email, gender, password } = req.body
    try {
        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(401).send({ msg: "User Already Present" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new UserModel({ name, email, gender, password: hash })
            await newUser.save()
            return res.status(200).send({ msg: "Registration Succesful" })
        })


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



userrouter.get("/userget", async (req, res) => {
    try {
        const allDoctors = await UserModel.find()
        return res.status(200).send({ allDoctors })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

module.exports=userrouter