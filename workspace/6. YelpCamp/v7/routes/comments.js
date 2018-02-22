var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
  
//Comments New
router.get("/new", isLoggedIn, function(req, res){
    //find a campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log (err);
        } else {
            res.render("comments/new", {campground: campground});   
        }
    });
});

//Comments Create
router.post("/", isLoggedIn, function(req, res){
  //look up the campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment) {
               if (err) {
                   console.log(err);
               } else {
                //connect new comment to campground
                    campground.comments.push(comment._id);
                    campground.save();
                    //redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
               }
            });
       }
    });
});

//Middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;