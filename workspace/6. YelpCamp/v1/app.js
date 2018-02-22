var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},    
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},    
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},    
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},    
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},    
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},    
        {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},    
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg"},    
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"}    
];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to the "campgrounds" array
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img}
    campgrounds.push(newCampground);
    //redirect the user back to "/campgrounds"
    res.redirect("/campgrounds"); //redirect is a GET request, so therefore it goes to "app.get("/campgrounds")"
});

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});