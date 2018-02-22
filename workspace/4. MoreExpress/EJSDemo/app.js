var express = require("express");
var app = express();

app.use(express.static("public")); // We tell express to serve the "public" directory (where CSS is)
app.set("view engine", "ejs"); // We tell express, that all our templates will be ".ejs"

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fellinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Such post, many wow", author: "Lizzy"},
        {title: "My adorable pet bunny", author: "Mike"},
        {title: "Can you believe this pomsky", author: "Jackie"},
        ];
    res.render("posts", {posts: posts})
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Ready to rock!");
});