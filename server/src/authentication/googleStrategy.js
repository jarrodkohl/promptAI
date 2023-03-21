import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import dotenv from "dotenv"
import User from "../models/User.js"
dotenv.config()

const googleAuthHandler = (accessToken, refreshToken, profile, done) =>{
  User.query()
  .findOne({ googleId: profile?.id })
  .then((user) => {
    if (user) {
      return done(null, user)
    }
    console.log(profile)
    //check profile.email
    User.query().insertAndFetch({
      googleId: profile.id,
      email: profile.emails[0].value
    }).then((user) => {
      return done(null, user)
    })
  })
}
const googleStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  },
  googleAuthHandler
  )
export default googleStrategy