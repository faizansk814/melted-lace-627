const express = require('express')
const role = require('../middleware/role')
const auth = require('../middleware/auth')
const DoctorModel = require('../model/doctor.model')
const { BookingModel } = require('../model/Booking')
const UserModel = require('../model/user.model')


const doctorroute = express.Router()


doctorroute.get("/doctorget", async (req, res) => {
    try {
        const allDoctors = await DoctorModel.find()
        return res.status(200).send({ allDoctors })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

doctorroute.post("/doctorpost", auth, role(["admin"]), async (req, res) => {
    try {
        const { image, name, email,password,phoneNo } = req.body
        const newDoctor = new DoctorModel({ image, name, email,password,phoneNo })
        await newDoctor.save()
        return res.status(200).send({ msg: "Doctor added succesfully" })
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







module.exports = doctorroute