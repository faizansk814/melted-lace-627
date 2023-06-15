const express=require('express')
const role = require('../middleware/role')
const auth = require('../middleware/auth')
const DoctorModel = require('../model/doctor.model')


const doctorroute=express.Router()


doctorroute.get("/doctorget",async (req,res)=>{
    try {
        const allDoctors=await DoctorModel.find()
        return res.status(200).send({allDoctors})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

doctorroute.post("/doctorpost",auth,role(["admin"]),async (req,res)=>{
    try {
       const {image,name,skills,language}=req.body
        const newDoctor=new DoctorModel({image,name,skills,language})
        await newDoctor.save()
        return res.status(200).send({msg:"Doctor added succesfully"})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})



module.exports=doctorroute