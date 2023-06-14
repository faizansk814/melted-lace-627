const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { UserModel }= require("../models/user.model")
const  {v4:uuidv4} = require("uuid");

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile, cb) {
    let email = profile._json.email
  const user = new UserModel({
    email,
    password: uuidv4()
  })
  
  
    // await user.save()
    // const {_id,password} = user;
    // const payload = {
    //     email,
    //     id,
    //     password,
    //     url: profile._json.picture
    // }
      return cb(null,user);
   
  }
));

module.exports=passport