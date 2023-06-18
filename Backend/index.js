const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {BookingRoute}=require("./routes/Booking")
const{DataBase}=require("./DBconnection")
const UserModel = require("./model/user.model")
const userrouter = require("./routes/user.router")
const doctorroute = require("./routes/doctor.route")
const auth = require("./middleware/auth")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userrouter);
app.use("/doctor",doctorroute)
app.use("/appointment",BookingRoute)

app.listen(process.env.PORT, () => {
    try {
        DataBase()
        console.log(`Server is running on port${process.env.PORT}`)
    } catch (error) {
        console.error(error)
    }

})
