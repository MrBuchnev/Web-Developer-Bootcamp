var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//ROUTES

app.get("/", function(req, res){
    res.render("landing");
});

//"INDEX" ROUTE - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//"CREATE" ROUTE - add new campground to database
app.post("/campgrounds", function(req, res){
    //get data from form and add to the "campgrounds" array
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: img, description: description};
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
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});

//"SHOW" ROUTE  - show info about a particular chosen element
app.get("/campgrounds/:id", function(req, res){
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

//====================
//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
    //find a campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log (err);
        } else {
            res.render("comments/new", {campground: campground});   
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
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
//====================


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});