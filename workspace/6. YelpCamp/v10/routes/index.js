var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");
  
//root route
router.get("/", function(req, res){
    res.render("landing");
});

//register form route
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login route
router.get("/login", function(req, res){
   res.render("login"); 
});

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;