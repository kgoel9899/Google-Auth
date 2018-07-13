const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
var PORT = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");

app.use(cookieSession({
  maxAge: 1000000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, function() {
  console.log("Connected to database");
}, {useNewUrlParser: true});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", function(req, res){
  res.render("home", {user: req.user});
});


app.listen(PORT, function(req, res){
  console.log("Listening to port 3000, Server started");
});
