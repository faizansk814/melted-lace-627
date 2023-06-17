const mongoose=require('mongoose')

const doctorSchema=mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    phoneNo:Number,
    language:Array,
    expreince:String
})

const DoctorModel=mongoose.model("doctor",doctorSchema)

module.exports=DoctorModel