const express = require('express');
const nodemailer=require("nodemailer")
const { BookingModel } = require("../model/Booking")
const Payment = express();

Payment.post('/payment', async (req, res) => {
    try {
        const { amount, cardNumber, cvv, expiry, doctor, patient, email, date, time} = req.body;

        if (!amount || !cardNumber || !cvv || !expiry) {
            return res.status(400).json({ error: 'Missing payment information' });
        }



        if (!isValidCardNumber(cardNumber)) {
            return res.status(400).json({ error: 'Invalid card number' });
        }


        if (!isValidCvv(cvv)) {
            return res.status(400).json({ error: 'Invalid CVV' });
        }


        if (!isValidExpiry(expiry)) {
            return res.status(400).json({ error: 'Invalid expiry date' });
        }
        const appointment = new BookingModel({ doctor, patient, date, time, email });
        await appointment.save();
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
              user: "faizansk814@gmail.com",
              pass: "mxnwujkvejocmhrr",
            },
          });
      
          const mailOptions = {
            from: "faizansk814@gmail.com",
            to: email,
            subject: "Payment Successful",
            html: `<div>
            <p>Hi ${patient}, Your Payment is successful and your slot is booked on ${date} at ${time}</p>
            </div>`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });

        res.json({ message: 'Payment successful' });
    } catch (error) {
        return res.status(401).json({ msg: error.message })
    }
});


function isValidCardNumber(cardNumber) {
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    if (cleanedCardNumber.length !== 16) {
        return false;
    }

    return /^\d{16}$/.test(cleanedCardNumber);
}

function isValidCvv(cvv) {

    return /^\d{3,4}$/.test(cvv);
}

function isValidExpiry(expiry) {

    return /^\d{2}\/\d{2}$/.test(expiry);
}


module.exports = { Payment }