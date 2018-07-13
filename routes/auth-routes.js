const router = require("express").Router();
const passport = require("passport");
router.get("/login", function(req, res){
  res.render("login", {user: req.user});
});

router.get("/logout", function(req, res){
  console.log("Logging out");
  req.logout();
  res.redirect("/");
});


//google routes
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

//this route is handling everything(cookies etc)
router.get("/google/redirect", passport.authenticate("google"), function(req, res) {
  // res.send("Reached callback URI");
  console.log(req.user);
  res.redirect("/profile");
});


//facebook routes
router.get("/facebook", passport.authenticate("facebook", {
  scope : ["email", "public_profile"]
}));

router.get("/facebook/redirect", passport.authenticate("facebook"), function(req, res){
  // res.send("Reached callback URI");
  console.log(req.user);
  res.redirect("/profile");
});
module.exports = router;
