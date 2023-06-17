const express = require("express")
const cors = require("cors")
require("dotenv").config()
const port=process.env.PORT
const {BookingRoute}=require("./routes/Booking")
const{DataBase}=require("./DBconnection")
const userrouter = require("./routes/user.router")
const app=express()
const path = require("path");
const UserModel = require("./model/user.model")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(cors())

app.get("/verify", async (req, res) => {
    try {
      const userId = req.query.id;
  
      const user = await UserModel.updateOne(
        { _id: userId },
        {$set:{isVerified:true}}
      );
     
      
      if (user.isVerified) {
        return res.status(200).json({ message: "Email already verified" });
      }
  
      res.sendFile(path.join(__dirname, "public", "pages", "verify.html"));
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.use("/user",userrouter);


app.use("/appointment",BookingRoute)


app.listen(port, () => {
    try {
        DataBase()
        console.log(`Server is running on port${port}`)
    } catch (error) {
        console.error(error)
    }

})
