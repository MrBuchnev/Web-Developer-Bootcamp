var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));  // added a more conventional route to the "public" directory
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Spell 'YelpCamp' backwards and all of your life's secrets will be revealed...",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    //find a campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log (err);
        } else {
            res.render("comments/new", {campground: campground});   
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

//====================
//AUTH ROUTES
//show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//handle signup logic
app.post("/register", function(req, res){
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

//handle login logic
app.get("/login", function(req, res){
   res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login" 
    }), function(req, res){
});

//logout logic
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});