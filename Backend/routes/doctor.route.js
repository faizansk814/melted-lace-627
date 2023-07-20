const express = require('express')
const role = require('../middleware/role')
const auth = require('../middleware/auth')
const DoctorModel = require('../model/doctor.model')
const { BookingModel } = require('../model/Booking')
const UserModel = require('../model/user.model')
const nodemailer=require("nodemailer")


const doctorroute = express.Router()


doctorroute.get("/doctorget", async (req, res) => {
    try {
        const allDoctors = await DoctorModel.find()
        return res.status(200).send({ allDoctors })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

doctorroute.post("/doctorpost", async (req, res) => {
    try {
        const { image, name, email,password,phoneNo,language,expreince } = req.body
        const newDoctor = new DoctorModel({ image, name, email,password,phoneNo,language,expreince })
        await newDoctor.save()
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
              user: "faizansk814@gmail.com",
              pass: "fnvbvtfqwgtcelib",
            },
          });
      
          const mailOptions = {
            from: "faizansk814@gmail.com",
            to: email,
            subject: "Login Credintials",
            html: `<div>
            <p>Hi ${name}, Your Login Credintials are</p>
            <p>Email:- ${email}</p>
            <p>Password:-${password}</p>
            </div>`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        return res.status(200).send({ msg: "Doctor added succesfully",newDoctor })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

doctorroute.get("/admin/all", async (req, res) => {
    try {
        const totalDoctors = await DoctorModel.find()
        const totalDoctorslength = totalDoctors.length
        const totalBooking = await BookingModel.find()
        const totalBookinglength = totalBooking.length
        const totalUsers = await UserModel.find()
        const totalUserslength = totalUsers.length
        res.status(200).send({ totalDoctorslength, totalBookinglength, totalUserslength })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

doctorroute.get("/userget", async (req, res) => {
    try {
        const allDoctors = await UserModel.find()
        return res.status(200).send({ allDoctors })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

doctorroute.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await DoctorModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"Doctor Deleted"})
})

doctorroute.delete("/deleteappointment/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await BookingModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"Booking deleted Deleted"})
})







module.exports = doctorroute