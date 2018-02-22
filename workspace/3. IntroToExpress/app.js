var express = require("express"); //including express into the file
var app = express(); //executing express ("app" is what most people call it)

app.get("/", function(req, res){
   res.send("Hi there!"); 
});

app.get("/bye", function(req, res){
    res.send("Goodbye, friend!");
});

app.get("/dog", function(req, res){
    console.log("Someone made a request to /DOG");
    res.send("Meeeooooow!");
    console.log("Page has been requested!")
});


app.get("/:title", function(req, res){
    var pageName = req.params.title.toUpperCase();
    res.send("WELCOME TO THE " + pageName + " PAGE!");
});

app.get("*", function(req, res){
    res.send("Sorry, this page doesn't exist. Thanks for trying though!");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server ready");
});