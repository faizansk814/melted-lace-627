const express = require('express')
const UserModel = require('../model/user.model')
const userrouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userrouter.post("/register", async (req, res) => {
    const { name, email, gender, password,role } = req.body
    try {
        const isUserPresent = await UserModel.findOne({ email })
        if (isUserPresent) {
            return res.status(401).send({ msg: "User Already Present" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new UserModel({ name, email, gender, password: hash ,role})
            await newUser.save()
            return res.status(200).send({ msg: "Registration Succesful" })
        })


    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

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

userrouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await UserModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"User Deleted"})
})





module.exports=userrouter