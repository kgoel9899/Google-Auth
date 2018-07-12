const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser(function(user, done) {
  done(null, user.id); //pass the id to the next stage
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user); //pass the user to next step
  })
});

passport.use(new GoogleStrategy({
  callbackURL: "/auth/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, function(accessToken, refreshToken, profile, done) {
  User.findOne({googleId: profile.id}).then(function(currentUser) {
    if(currentUser) {
      console.log("User already exists:" + currentUser);
      done(null, currentUser); //this will go to the serialize function for further steps
    } else {
      new User({
        username: profile.displayName,
        googleId: profile.id
      }).save().then(function(newUser) {
        console.log("Created");
        console.log(newUser);
        done(null, newUser); ////this will go to the serialize function for further steps
      });
    }
  });
  // console.log(profile);
}
));
