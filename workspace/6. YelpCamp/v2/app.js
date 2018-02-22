var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
//         description: "This is a huge granite hill. No bathrooms. No water. Beautifutl granite!"
//     }, 
//     function(err, campground){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground:");
//             console.log(campground);
//         }
//     });

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
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
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
   res.render("new"); 
});

//"SHOW" ROUTE  - show info about a particular chosen element
app.get("/campgrounds/:id", function(req, res){
    //find the campgrounds with provided ID
    Campground.findById(req.params.id, function(err, foundCampround){
       if (err){
           console.log(err);
       } else {
           //render the show template with that campground
           res.render("show", {campground: foundCampround});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});