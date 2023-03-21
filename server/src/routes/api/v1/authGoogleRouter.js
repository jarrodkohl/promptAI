import passport from "passport"
import express from "express";

const authGoogleRouter = new express.Router()
authGoogleRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authGoogleRouter.get('/callback', passport.authenticate('google', 
  { 
    successRedirect: "/",
    failureRedirect: "/auth/google/failure"
  })
)

export default authGoogleRouter