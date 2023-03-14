const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from "../models/User.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.query()
            .findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    return cb(null, existingUser);
                }
                const newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value
                });
                newUser.save()
                    .then((user) => {
                        return cb(null, user);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }
));

module.exports = passport;
