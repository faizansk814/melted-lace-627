const express = require('express');


const Payment = express();

Payment.post('/payment', (req, res) => {
    const { amount, cardNumber, cvv, expiry } = req.body;


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


    return res.json({ message: 'Payment successful' });
});


function isValidCardNumber(cardNumber) {

    const cleanedCardNumber = cardNumber.replace(/\D/g, '');


    if (!/^\d{16}$/.test(cleanedCardNumber)) {
        return false;
    }


    let sum = 0;
    let isSecondDigit = false;

    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedCardNumber.charAt(i), 10);

        if (isSecondDigit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isSecondDigit = !isSecondDigit;
    }

    return sum % 10 === 0;
}

function isValidCvv(cvv) {

    return /^\d{3,4}$/.test(cvv);
}

function isValidExpiry(expiry) {

    return /^\d{2}\/\d{2}$/.test(expiry);
}


module.exports = { Payment }