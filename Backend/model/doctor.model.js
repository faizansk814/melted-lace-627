const mongoose=require('mongoose')

const doctorSchema=mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    phoneNo:Number
})

const DoctorModel=mongoose.model("doctor",doctorSchema)

module.exports=DoctorModel