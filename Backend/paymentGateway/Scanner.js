const qr = require('qr-image');
const fs = require('fs');
const auth = require("../middleware/auth");
const express = require("express");
const scanner = express();
const path = require('path');

scanner.post("/qr", async (req, res) => {
  try {
    const link = 'https://localhost:8080/petcare/payment';
    const filename = path.join(__dirname, 'qrcode.png');

    generateQRCode(link, filename, () => {
      res.status(200).sendFile(filename);
    });
  } catch (error) {
    console.log(error);
    res.status(200).json(error);
  }
});

function generateQRCode(link, filename, callback) {
  const qrCode = qr.image(link, { type: 'png' });
  qrCode.pipe(fs.createWriteStream(filename))
    .on('finish', callback);
}

module.exports = { scanner };
