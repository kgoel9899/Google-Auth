const router = require("express").Router();

const authCheck = function(req, res, next) {
  if(!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, function(req, res) {
  res.send("Logged in as " + req.user.username);
});

module.exports = router;
