var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");
    
//"INDEX" ROUTE - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//"CREATE" ROUTE - add new campground to database
router.post("/", isLoggedIn, function(req, res){
    //get data from form and add to the "campgrounds" array
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: img, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            //redirect the user back to "/campgrounds"
            res.redirect("/campgrounds"); //redirect is a GET request, so therefore it goes to "app.get("/campgrounds")" 
        }
    });
});

//"NEW" ROUTE - display a form to create new campground
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//"SHOW" ROUTE  - show info about a particular chosen element
router.get("/:id", function(req, res){
    //find the campgrounds with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampround){
       if (err){
           console.log(err);
       } else {
           //render the show template with that campground
           res.render("campgrounds/show", {campground: foundCampround});
       }
    });
});

//"EDIT" ROUTE - edit the previously-created campground
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampround){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampround});
        }
    });
});

//"UPDATE" ROUTE
router.put("/:id", function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        } else {
            //redirect to the show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;