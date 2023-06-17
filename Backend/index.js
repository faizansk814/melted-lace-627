const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const {BookingRoute}=require("./routes/Booking")
const{DataBase}=require("./DBconnection")
const userrouter = require("./routes/user.router")
const UserModel = require("./model/user.model")
app.use(express.json())
app.use(cors())


app.use("/user",userrouter);


app.listen(process.env.PORT, () => {
    try {
        DataBase()
        console.log(`Server is running on port${process.env.PORT}`)
    } catch (error) {
        console.error(error)
    }

})
