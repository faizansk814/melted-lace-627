const mongoose=require('mongoose')

const doctorSchema=mongoose.Schema({
    image:String,
    name:String,
    skills:Array,
    language:Array
})

const DoctorModel=mongoose.model("doctor",doctorSchema)

module.exports=DoctorModel