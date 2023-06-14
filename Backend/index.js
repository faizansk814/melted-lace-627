const express=require("express")
const cors=require("cors")
require("dotenv").config()
const port=process.env.PORT
const {BookingRoute}=require("./routes/Booking")
const{DataBase}=require("./DBconnection")
const app=express()
app.use(express.json())
app.use(cors())


app.use("/appointment",BookingRoute)

app.listen(port, () => {
    try {
       DataBase()
        console.log(`Server is running on port${port}`)
    } catch (error) {
        console.error(error)
    }

})
