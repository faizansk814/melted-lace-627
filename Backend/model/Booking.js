const mongoose = require("mongoose")
const BookingSchema = mongoose.Schema({
    doctor: { type: String, required: true },
    patient: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
})
const BookingModel=mongoose.model("Bookings",BookingSchema)

module.exports={BookingModel}