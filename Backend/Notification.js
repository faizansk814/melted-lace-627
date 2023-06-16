const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const { BookingModel } = require('./model/Booking');
require('dotenv').config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const dbConfig = {
  uri: process.env.DATABASE_URL, 
  collectionName: process.env.COLLECTION_NAME,
};


async function sendNotificationEmail(recipientEmail, meetingTime) {
  const msg = {
    to: recipientEmail,
    from: process.env.FROM_EMAIL, 
    subject: 'Appointment Reminder',
    text: `Your appointment is scheduled at ${meetingTime}.`,
    html: `<p>Your appointment is scheduled in  minutes at ${meetingTime}.</p>`,
  };

 await sgMail
    .send(msg)
    .then(() => console.log('Notification email sent successfully'))
    .catch((error) => console.error('Error sending notification email:', error));
}


async function processUpcomingAppointments(){
const data=await BookingModel.find()
data.forEach((a)=>{
  console.log(a.time)
  const [hrs, mins] = a.time.split(":").map(str => parseInt(str))
  console.log(a.date);
 if(DateCheck(a.date)&& TimeCheck(hrs,mins)){
   sendNotificationEmail(a.email, a.time)
 }
  })
  }



mongoose
  .connect(dbConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

   
    setInterval(() => {
      processUpcomingAppointments();
    }, 6000);
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
  function TimeCheck(hrs,mins){
    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const modifiedTime = new Date(new Date(now).getTime() + 1 * 60000);
    if(modifiedTime.getHours()==hrs&&modifiedTime.getMinutes()==mins){
      return true
    }
    return false
  }
  function DateCheck(date) {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
const today = new Date().toLocaleDateString('en-IN', options).replace(/\//g, '/');
if(today==date){
  return true
}else{
  false;
}

  }
