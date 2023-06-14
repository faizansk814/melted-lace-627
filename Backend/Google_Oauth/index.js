
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const passport = require("./configs/google-outh");

const {connection} = require("./db")
// github login integration
const client_id = "fa13941b658610eebb16";
const secret_id = "4f02169c90e1850bf08ef26520c2d1a1e576ae8b"


const app = express();


app.use(express.json());
require("dotenv").config();

// 
app.get("/",(req,res)=>{
   res.send("base end point")
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });

app.get("/login",(req,res)=>{
   res.sendFile(__dirname+"/index.html")
})

app.get("/auth/github",async(req,res)=>{
   const {code} = req.query
   const accessToken = await fetch(
     "https://github.com/login/oauth/access_token",
     {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-type": "application/json",
       },
       body: JSON.stringify({
         client_id: client_id,
         client_secret: secret_id,
         code,
       }),
     }
   ).then((res) => {
     return res.json();
   });

 const useremails = await fetch("https://api.github.com/user/emails",{
   headers :{
      Authorization : `Bearer ${accessToken.access_token}`
   }
 })
 .then((res)=>res.json())
 .catch((err)=>console.log(err))
 console.log(useremails);
  
   res.send("sign in success")
})



app.listen(8080,async()=>{
   try {
      await connection
      console.log("connected to db")
   } catch (error) {
      console.log(error)
   }
    console.log("server is runnig on port 8080")
})