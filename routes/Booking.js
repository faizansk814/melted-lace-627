const express = require("express")
const BookingRoute = express()
const { BookingModel } = require("../model/Booking")

BookingRoute.post("/Book", async (req, res) => {
    const { doctor, patient, date, time } = req.body
    try {
        if (!validateDateFormat(date)) {
            return res.status(400).json({ error: "Invalid date format. Please use dd/mm/yy format." })
        }
    
        if (!validateTimeFormat(time)) {
            return res.status(400).json({ error: "Invalid Time format. Please use 12 hrs clock only and use only AM and PM.Time must be between 9 AM to 8PM" })
        }
        
        const existingAppointment = await BookingModel.findOne({ doctor, date, time });
        if (existingAppointment) {
            return res.status(409).json({ message: 'This time slot is already booked.' });
        }
        const appointment = new BookingModel({ doctor, patient, date, time });
        await appointment.save();
        return res.status(200).json({ msg: `your appointment is Schedule on  ${date} with ${doctor}` })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})
BookingRoute.get("/patient", async (req, res) => {
    const { patient } = req.body
    try {
        const bookings = BookingModel.find({ patient })
        if (!bookings) {
            return res.status(200).json({ msg: "No bookings found" })
        }
        return res.status(200).json({ bookings })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})
BookingRoute.get("/doctor", async (req, res) => {
    const { doctor } = req.body
    try {
        const bookings = BookingModel.find({ doctor })
        if (!bookings) {
            return res.status(200).json({ msg: "No bookings found" })
        }
        return res.status(200).json({ bookings })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})
BookingRoute.put("/update/:id", async (req, res) => {
    const appointmentId = req.params.id;
    const { doctor, patient, date, time } = req.body
    try {
        if (!validateDateFormat) {
            return res.status(400).json({ error: "Invalid date format. Please use dd/mm/yy format." })
        }
        if (!validateTimeFormat) {
            return res.status(400).json({ error: "Invalid Time format. Please use 12 hrs clock only and use only AM and PM.Time must be between 9 AM to 8PM" })
        }
        const existingAppointment = await BookingModel.findById({ appointmentId });
        if (!existingAppointment) {
            return res.status(409).json({ message: 'This booking is not found' });
        }

        existingAppointment.doctor = doctor;
        existingAppointment.patient = patient;
        existingAppointment.date = date;
        existingAppointment.time = time;

        await existingAppointment.save();
        return res.status(200).json({ msg: `your appointment is updated for  ${date} with ${doctor}` })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

BookingRoute.delete("/cancel/:id", async (req, res) => {

    try {
        const appointmentId = req.params.id;


        const existingAppointment = await BookingModel.findById(appointmentId);
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }


        await BookingModel.findByIdAndDelete(appointmentId);

        return res.status(200).json({ message: 'Appointment cancelled successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})
function validateDateFormat(Date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
    return dateRegex.test(Date);
}
function validateTimeFormat(time) {
    const timeRegex = /^(0?9|10|11|12|[1-7]):(00|30) (AM|PM)$/;
    return timeRegex.test(time);
}
module.exports={BookingRoute}